import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = true;
const resend = new Resend(undefined                              );
const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const title = formData.get("title");
    const organization = formData.get("organization");
    const departmentCount = formData.get("departmentCount");
    const staffCount = formData.get("staffCount");
    const specialties = formData.get("specialties");
    const plan = formData.get("plan");
    const additionalInfo = formData.get("additionalInfo");
    if (!name || !email || !organization || !departmentCount || !staffCount || !plan) {
      return new Response(JSON.stringify({
        success: false,
        error: "All required fields must be filled out"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    try {
      await resend.emails.send({
        from: "BioSked Website <website@send.biosked.com>",
        to: "sales@biosked.com",
        subject: `New Get Started Request - ${plan} Plan from ${organization}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5; color: #09090b;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f5;">
                <tr>
                  <td align="center" style="padding: 40px 20px;">
                    <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                      <tr>
                        <td style="padding: 32px 32px 24px; border-bottom: 1px solid #e4e4e7;">
                          <h1 style="margin: 0 0 8px; font-size: 24px; font-weight: 600; color: #09090b;">New Get Started Request</h1>
                          <p style="margin: 0; font-size: 14px; color: #71717a;">Someone is ready to get started with BioSked</p>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 24px 32px;">
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td colspan="2" style="padding: 0 0 16px 0;">
                                <div style="font-size: 11px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">Contact Information</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5;">
                                <div style="font-size: 12px; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Name</div>
                                <div style="font-size: 15px; color: #09090b; font-weight: 500;">${name}</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5;">
                                <div style="font-size: 12px; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Email</div>
                                <div style="font-size: 15px;"><a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a></div>
                              </td>
                            </tr>
                            ${phone ? `
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5;">
                                <div style="font-size: 12px; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Phone</div>
                                <div style="font-size: 15px; color: #09090b;">${phone}</div>
                              </td>
                            </tr>
                            ` : ""}
                            ${title ? `
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5;">
                                <div style="font-size: 12px; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Job Title</div>
                                <div style="font-size: 15px; color: #09090b;">${title}</div>
                              </td>
                            </tr>
                            ` : ""}
                            
                            <tr>
                              <td colspan="2" style="padding: 16px 0 16px 0;">
                                <div style="font-size: 11px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">Organization Details</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5;">
                                <div style="font-size: 12px; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Organization</div>
                                <div style="font-size: 15px; color: #09090b; font-weight: 500;">${organization}</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5;">
                                <div style="font-size: 12px; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Departments</div>
                                <div style="font-size: 15px; color: #09090b;">${departmentCount}</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5;">
                                <div style="font-size: 12px; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Staff Size</div>
                                <div style="font-size: 15px; color: #09090b;">${staffCount}</div>
                              </td>
                            </tr>
                            ${specialties ? `
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5;">
                                <div style="font-size: 12px; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Specialties</div>
                                <div style="font-size: 15px; color: #09090b;">${specialties}</div>
                              </td>
                            </tr>
                            ` : ""}
                            
                            <tr>
                              <td colspan="2" style="padding: 16px 0 16px 0;">
                                <div style="font-size: 11px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px;">Plan & Timeline</div>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5;">
                                <div style="font-size: 12px; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Preferred Plan</div>
                                <div style="font-size: 15px; color: #09090b; font-weight: 600;">${plan}</div>
                              </td>
                            </tr>
                            ${additionalInfo ? `
                            <tr>
                              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5;">
                                <div style="font-size: 12px; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Additional Information</div>
                                <div style="font-size: 15px; color: #09090b; white-space: pre-wrap;">${additionalInfo}</div>
                              </td>
                            </tr>
                            ` : ""}
                            <tr>
                              <td style="padding: 12px 0;">
                                <div style="font-size: 12px; font-weight: 500; color: #71717a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Submitted</div>
                                <div style="font-size: 14px; color: #71717a;">${(/* @__PURE__ */ new Date()).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 24px 32px; background-color: #fafafa; border-top: 1px solid #e4e4e7; border-radius: 0 0 8px 8px;">
                          <p style="margin: 0; font-size: 13px; color: #71717a; text-align: center;">
                            This email was sent from the BioSked pricing page
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `
      });
    } catch (emailError) {
    }
    return new Response(JSON.stringify({
      success: true,
      message: "Thank you! Our team will reach out within 24 hours to help you get started."
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: "An error occurred processing your request"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
