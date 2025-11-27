export { renderers } from '../../renderers.mjs';

const prerender = true;
const HUBSPOT_PORTAL_ID = undefined                                 ;
const HUBSPOT_FORM_ID = undefined                               ;
const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const mobilephone = formData.get("mobilephone");
    const subject = formData.get("subject");
    const content = formData.get("content");
    if (!firstname || !lastname || !email || !subject || !content) {
      return new Response(JSON.stringify({
        success: false,
        error: "All required fields must be filled out"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    try {
      const hubspotData = {
        fields: [
          { name: "firstname", value: firstname },
          { name: "lastname", value: lastname },
          { name: "email", value: email },
          { name: "mobilephone", value: mobilephone || "" },
          { name: "TICKET.subject", value: subject },
          { name: "TICKET.content", value: content }
        ],
        context: {
          pageUri: request.headers.get("referer") || "https://biosked.com/contact",
          pageName: "Contact Form"
        }
      };
      const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
      const hubspotResponse = await fetch(hubspotUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(hubspotData)
      });
      if (!hubspotResponse.ok) {
        const errorText = await hubspotResponse.text();
        console.error("HubSpot response:", errorText);
        throw new Error(`HubSpot API error: ${hubspotResponse.status}`);
      }
    } catch (hubspotError) {
      console.error("Error submitting to HubSpot:", hubspotError);
      return new Response(JSON.stringify({
        success: false,
        error: "Failed to submit form. Please try again."
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      success: true,
      message: "Thank you for contacting us! We'll get back to you soon."
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
