interface SignaturePreviewProps {
  data: {
    fullName: string
    jobTitle: string
    officePhone: string
    mobilePhone: string
    email: string
    website: string
    companyLogo: string
    showOfficePhone: boolean
    showMobilePhone: boolean
    showDisclaimer: boolean
    textColor: string
    socialMedia: {
      x: string
      facebook: string
      instagram: string
      google: string
    }
    enabledSocial: {
      x: boolean
      facebook: boolean
      instagram: boolean
      google: boolean
    }
  }
  icons: {
    x: string
    facebook: string
    instagram: string
    google: string
  }
}

export default function SignaturePreview({ data, icons }: SignaturePreviewProps) {
  const {
    fullName,
    jobTitle,
    officePhone,
    mobilePhone,
    email,
    website,
    companyLogo,
    showOfficePhone,
    showMobilePhone,
    showDisclaimer,
    textColor,
    socialMedia,
    enabledSocial,
  } = data

  // Ensure we have a valid text color, defaulting to #47403d if not
  const safeTextColor = textColor || "#47403d"

  // Default text color for content that doesn't change with the color picker
  const defaultTextColor = "#47403d"

  // Create a divider color with opacity to ensure it's always visible
  // Using hex with opacity since Outlook doesn't support rgba
  const dividerColor = safeTextColor ? `${safeTextColor}` : "#47403d"

  const disclaimerText =
    "This message contains confidential information and is intended only for the intended recipients. If you are not an intended recipient you should not disseminate, distribute or copy this e-mail. Please notify us immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system. E-mail transmission cannot be guaranteed to be secure or error-free as information could be intercepted, corrupted, lost, destroyed, arrive late or incomplete, or contain viruses. Therefore we do not accept liability for any errors or omissions in the contents of this message, which arise as a result of e-mail transmission. If verification is required please request a hard-copy version."

  return (
    <div
      id="signature-preview"
      style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: "#47403d", lineHeight: "1.4" }}
    >
      {/* Main signature table - Outlook-friendly structure */}
      <table
        cellPadding="0"
        cellSpacing="0"
        border="0"
        style={{ borderCollapse: "collapse", width: "100%", maxWidth: "550px" }}
      >
        <tbody>
          <tr>
            {/* Logo cell - fixed width for Outlook */}
            <td width="150" valign="middle" style={{ padding: "0 15px 0 0" }}>
              {companyLogo.startsWith("/placeholder") ? (
                <img
                  src={companyLogo || "/placeholder.svg"}
                  alt="Company Logo"
                  width="150"
                  height="50"
                  style={{ display: "block", maxWidth: "150px", height: "auto", border: "0" }}
                />
              ) : (
                <img
                  src={companyLogo || "/placeholder.svg"}
                  alt="Company Logo"
                  width="150"
                  height="50"
                  style={{ display: "block", maxWidth: "150px", height: "auto", border: "0" }}
                />
              )}
            </td>

            {/* Vertical divider - using border-left in a separate cell for Outlook */}
            <td width="2" style={{ width: "2px", backgroundColor: dividerColor, padding: "0" }}>
              &nbsp;
            </td>

            {/* Content cell */}
            <td valign="top" style={{ padding: "0 0 0 15px" }}>
              <table cellPadding="0" cellSpacing="0" border="0" style={{ borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "0 0 4px 0" }}>
                      <span
                        style={{
                          fontFamily: "Arial, sans-serif",
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: safeTextColor,
                        }}
                      >
                        {fullName}
                      </span>
                    </td>
                  </tr>

                  {jobTitle && (
                    <tr>
                      <td style={{ padding: "0 0 8px 0" }}>
                        <span style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: defaultTextColor }}>
                          {jobTitle}
                        </span>
                      </td>
                    </tr>
                  )}

                  {showOfficePhone && officePhone && (
                    <tr>
                      <td style={{ padding: "0 0 4px 0" }}>
                        <span
                          style={{
                            fontFamily: "Arial, sans-serif",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: safeTextColor,
                          }}
                        >
                          Office:{" "}
                        </span>
                        <span style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: defaultTextColor }}>
                          {officePhone}
                        </span>
                      </td>
                    </tr>
                  )}

                  {showMobilePhone && mobilePhone && (
                    <tr>
                      <td style={{ padding: "0 0 4px 0" }}>
                        <span
                          style={{
                            fontFamily: "Arial, sans-serif",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: safeTextColor,
                          }}
                        >
                          Mobile:{" "}
                        </span>
                        <span style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: defaultTextColor }}>
                          {mobilePhone}
                        </span>
                      </td>
                    </tr>
                  )}

                  {email && (
                    <tr>
                      <td style={{ padding: "0 0 4px 0" }}>
                        <span
                          style={{
                            fontFamily: "Arial, sans-serif",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: safeTextColor,
                          }}
                        >
                          Email:{" "}
                        </span>
                        <a
                          href={`mailto:${email}`}
                          style={{
                            fontFamily: "Arial, sans-serif",
                            fontSize: "12px",
                            color: defaultTextColor,
                            textDecoration: "none",
                          }}
                        >
                          {email}
                        </a>
                      </td>
                    </tr>
                  )}

                  {website && (
                    <tr>
                      <td style={{ padding: "0 0 4px 0" }}>
                        <span
                          style={{
                            fontFamily: "Arial, sans-serif",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: safeTextColor,
                          }}
                        >
                          Web:{" "}
                        </span>
                        <a
                          href={website.startsWith("http") ? website : `https://${website}`}
                          style={{
                            fontFamily: "Arial, sans-serif",
                            fontSize: "12px",
                            color: defaultTextColor,
                            textDecoration: "none",
                          }}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {website}
                        </a>
                      </td>
                    </tr>
                  )}

                  {/* Social Media Icons */}
                  <tr>
                    <td style={{ padding: "10px 0 0 0" }}>
                      <table cellPadding="0" cellSpacing="0" border="0" style={{ borderCollapse: "collapse" }}>
                        <tbody>
                          <tr>
                            {enabledSocial.x && socialMedia.x && (
                              <td style={{ padding: "0 8px 0 0" }}>
                                <a href={socialMedia.x} target="_blank" rel="noreferrer">
                                  <img
                                    src={icons.x || "/placeholder.svg"}
                                    alt="X (Twitter)"
                                    width="20"
                                    height="20"
                                    style={{ display: "block", border: "0" }}
                                  />
                                </a>
                              </td>
                            )}
                            {enabledSocial.facebook && socialMedia.facebook && (
                              <td style={{ padding: "0 8px 0 0" }}>
                                <a href={socialMedia.facebook} target="_blank" rel="noreferrer">
                                  <img
                                    src={icons.facebook || "/placeholder.svg"}
                                    alt="Facebook"
                                    width="20"
                                    height="20"
                                    style={{ display: "block", border: "0" }}
                                  />
                                </a>
                              </td>
                            )}
                            {enabledSocial.instagram && socialMedia.instagram && (
                              <td style={{ padding: "0 8px 0 0" }}>
                                <a href={socialMedia.instagram} target="_blank" rel="noreferrer">
                                  <img
                                    src={icons.instagram || "/placeholder.svg"}
                                    alt="Instagram"
                                    width="20"
                                    height="20"
                                    style={{ display: "block", border: "0" }}
                                  />
                                </a>
                              </td>
                            )}
                            {enabledSocial.google && socialMedia.google && (
                              <td style={{ padding: "0" }}>
                                <a href={socialMedia.google} target="_blank" rel="noreferrer">
                                  <img
                                    src={icons.google || "/placeholder.svg"}
                                    alt="Google"
                                    width="20"
                                    height="20"
                                    style={{ display: "block", border: "0" }}
                                  />
                                </a>
                              </td>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Disclaimer section */}
      {showDisclaimer && (
        <table
          cellPadding="0"
          cellSpacing="0"
          border="0"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            maxWidth: "550px",
            marginTop: "15px",
            borderTop: `2px solid ${dividerColor}`,
          }}
        >
          <tbody>
            <tr>
              <td style={{ paddingTop: "15px" }}>
                <p
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "9px",
                    color: defaultTextColor,
                    margin: "0",
                    lineHeight: "1.3",
                    maxWidth: "550px",
                  }}
                >
                  {disclaimerText}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

