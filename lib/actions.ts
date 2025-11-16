"use server"

import { getErrorMessage, validateString } from "@/lib/utils"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (prevState: any, formData: FormData) => {
  // Handle null formData as a safety check
  if (!formData) {
    return {
      error: "Form data is missing",
    }
  }

  // Check if Resend API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set")
    return {
      error: "Email service is not configured. Please contact the administrator.",
    }
  }

  const email = formData.get("email")
  const name = formData.get("name")
  const message = formData.get("message")
  const subject = formData.get("subject")

  // simple server-side validation
  if (!validateString(email, 500)) {
    return {
      error: "Invalid sender email",
    }
  }

  if (!email.includes("@")) {
    return {
      error: "Invalid email format",
    }
  }

  if (!validateString(name, 500)) {
    return {
      error: "Invalid sender name",
    }
  }

  if (!validateString(subject, 250)) {
    return {
      error: "Invalid subject",
    }
  }

  if (!validateString(message, 2500)) {
    return {
      error: "Invalid message",
    }
  }

  let data
  try {
    data = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      subject: subject as string,
      replyTo: email as string,
      to: "ali.moh.islam.1@gmail.com",
      text: `From: ${name}\nEmail: ${email}\n\n${message}`,
    })

    // Log success for debugging - log the full response structure
    console.log("Email sent successfully. Response:", JSON.stringify(data, null, 2))
  } catch (error) {
    // Log the full error for debugging
    console.error("Error sending email:", error)
    const errorMessage = getErrorMessage(error)
    
    // Provide more helpful error messages
    if (errorMessage.includes("domain") || errorMessage.includes("Domain")) {
      return {
        error: "Email domain not verified. Please verify 'amtayeb.dev' in Resend dashboard.",
      }
    }
    
    if (errorMessage.includes("API key") || errorMessage.includes("Unauthorized")) {
      return {
        error: "Invalid API key. Please check RESEND_API_KEY in environment variables.",
      }
    }

    return {
      error: `Failed to send email: ${errorMessage}`,
    }
  }

  // Check if the email was actually sent
  // Resend returns { data: { id: "..." } } or { id: "..." } depending on version
  const emailId = (data as any)?.id || (data as any)?.data?.id
  
  if (!data) {
    console.error("Resend returned null/undefined response")
    return {
      error: "Email service returned an unexpected response. Please try again.",
    }
  }

  if (!emailId) {
    console.error("Resend response missing id field. Full response:", JSON.stringify(data, null, 2))
    // Still return success if we got a response - the email might have been sent
    // Some Resend responses might not include id in certain cases
    return {
      data,
      success: true,
      warning: "Email may have been sent, but confirmation ID is missing.",
    }
  }

  return {
    data,
    success: true,
  }
}

