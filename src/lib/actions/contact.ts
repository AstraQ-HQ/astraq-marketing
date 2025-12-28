"use server";

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const company = formData.get("company");
    const message = formData.get("message");

    if (!name || !email || !message) {
      return {
        success: false,
        error: "Please fill in all required fields",
      };
    }

    console.log("Contact form submission:", {
      name,
      email,
      company,
      message,
    });

    return {
      success: true,
      message: "Message sent successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to send message. Please try again.",
    };
  }
}
