import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

type FormType = 'newsletter' | 'contact' | 'checkout';

type FormRequestBody = {
    formType: FormType;
    data: Record<string, unknown>;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

const buildEmailPayload = (payload: FormRequestBody) => {
    const { formType, data } = payload;

    if (formType === 'newsletter') {
        const email = getString(data.email).toLowerCase();

        if (!email || !emailRegex.test(email)) {
            return { error: 'Email inválido para newsletter.' };
        }

        return {
            subject: 'Nueva suscripción a newsletter',
            html: `
                <h2>Nueva suscripción</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Origen:</strong> ${getString(data.source) || 'no informado'}</p>
                <p><strong>Fecha:</strong> ${new Date().toISOString()}</p>
            `,
            replyTo: email,
        };
    }

    if (formType === 'contact') {
        const name = getString(data.name);
        const email = getString(data.email).toLowerCase();
        const phone = getString(data.phone);
        const profile = getString(data.profile);
        const reason = getString(data.reason);
        const company = getString(data.company);
        const orderReference = getString(data.orderReference);
        const message = getString(data.message);

        if (!name || !emailRegex.test(email) || !profile || !reason || !message) {
            return { error: 'Faltan datos requeridos para formulario de contacto.' };
        }

        return {
            subject: `Nuevo contacto (${profile}): ${name}`,
            html: `
                <h2>Formulario de contacto</h2>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Perfil:</strong> ${profile}</p>
                <p><strong>Motivo:</strong> ${reason}</p>
                <p><strong>Telefono:</strong> ${phone || 'no informado'}</p>
                <p><strong>Empresa:</strong> ${company || 'no informada'}</p>
                <p><strong>Nro. de pedido:</strong> ${orderReference || 'no informado'}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${message.replace(/\n/g, '<br />')}</p>
            `,
            replyTo: email,
        };
    }

    if (formType === 'checkout') {
        const name = getString(data.name);
        const email = getString(data.email).toLowerCase();
        const address = getString(data.address);
        const city = getString(data.city);
        const postalCode = getString(data.postalCode);
        const country = getString(data.country);

        if (!name || !emailRegex.test(email) || !address) {
            return { error: 'Faltan datos requeridos para checkout.' };
        }

        return {
            subject: `Nuevo checkout de ${name}`,
            html: `
                <h2>Nueva solicitud de checkout</h2>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Dirección:</strong> ${address}</p>
                <p><strong>Ciudad:</strong> ${city}</p>
                <p><strong>Código postal:</strong> ${postalCode}</p>
                <p><strong>País:</strong> ${country}</p>
                <p><strong>Fecha:</strong> ${new Date().toISOString()}</p>
            `,
            replyTo: email,
        };
    }

    return { error: 'Tipo de formulario no soportado.' };
};

export async function POST(request: NextRequest) {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const to = process.env.RESEND_TO_EMAIL;

    if (!apiKey || !from || !to) {
        return NextResponse.json(
            {
                error: 'Faltan variables de entorno para Resend (RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL).',
            },
            { status: 500 }
        );
    }

    try {
        const body = (await request.json()) as FormRequestBody;

        if (!body || !body.formType || typeof body.data !== 'object' || body.data === null) {
            return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 });
        }

        const emailPayload = buildEmailPayload(body);

        if ('error' in emailPayload) {
            return NextResponse.json({ error: emailPayload.error }, { status: 400 });
        }

        const resend = new Resend(apiKey);

        await resend.emails.send({
            from,
            to: [to],
            subject: emailPayload.subject,
            html: emailPayload.html,
            replyTo: emailPayload.replyTo,
        });

        return NextResponse.json({ ok: true, message: 'Formulario enviado correctamente.' }, { status: 200 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error interno al enviar el formulario.';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
