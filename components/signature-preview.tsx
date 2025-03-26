interface SignaturePreviewProps {
  data: {
    fullName: string;
    jobTitle: string;
    officePhone: string;
    mobilePhone: string;
    email: string;
    website: string;
    companyLogo: string;
    showOfficePhone: boolean;
    showMobilePhone: boolean;
    showDisclaimer: boolean;
    textColor: string;
    socialMedia: {
      x: string;
      facebook: string;
      instagram: string;
      google: string;
      youtube: string;
    };
    enabledSocial: {
      x: boolean;
      facebook: boolean;
      instagram: boolean;
      google: boolean;
      youtube: boolean;
    };
  };
  icons: {
    x: string;
    facebook: string;
    instagram: string;
    google: string;
    youtube: string;
  };
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
  } = data;

  // Ensure we have a valid text color, defaulting to #47403d if not
  const safeTextColor = textColor || '#47403d';

  // Default text color for content that doesn't change with the color picker
  const defaultTextColor = '#47403d';

  // Create a divider color with opacity to ensure it's always visible
  // Using hex with opacity since Outlook doesn't support rgba
  const dividerColor = safeTextColor ? `${safeTextColor}` : '#47403d';

  const disclaimerText =
    'This message contains confidential information and is intended only for the intended recipients. If you are not an intended recipient you should not disseminate, distribute or copy this e-mail. Please notify us immediately by e-mail if you have received this e-mail by mistake and delete this e-mail from your system. E-mail transmission cannot be guaranteed to be secure or error-free as information could be intercepted, corrupted, lost, destroyed, arrive late or incomplete, or contain viruses. Therefore we do not accept liability for any errors or omissions in the contents of this message, which arise as a result of e-mail transmission. If verification is required please request a hard-copy version.';

  return (
    <div
      id="signature-preview"
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        color: '#47403d',
        lineHeight: '1.4',
      }}
    >
      {/* Main signature table - Outlook-friendly structure */}
      <table
        cellPadding={0}
        cellSpacing={0}
        border={0}
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          maxWidth: '550px',
          border: 'none',
          borderSpacing: '0',
          borderWidth: '0',
          margin: '0',
          padding: '0',
          outline: 'none',
        }}
      >
        <tbody
          style={{ border: 'none', borderWidth: '0', margin: '0', padding: '0', outline: 'none' }}
        >
          <tr
            style={{ border: 'none', borderWidth: '0', margin: '0', padding: '0', outline: 'none' }}
          >
            {/* Logo cell - fixed width for Outlook */}
            <td
              width="150"
              valign="middle"
              style={{
                padding: '0 15px 0 0',
                border: 'none',
                borderWidth: '0',
                margin: '0',
                outline: 'none',
              }}
            >
              {companyLogo.startsWith('/placeholder') ? (
                <img
                  src={companyLogo || '/placeholder.svg'}
                  alt="Company Logo"
                  width="auto"
                  height="150"
                  style={{
                    display: 'block',
                    border: '0',
                    margin: '0',
                    padding: '0',
                    outline: 'none',
                  }}
                />
              ) : (
                <img
                  src={companyLogo || '/placeholder.svg'}
                  alt="Company Logo"
                  width="auto"
                  height="150"
                  style={{
                    display: 'block',
                    border: '0',
                    margin: '0',
                    padding: '0',
                    outline: 'none',
                  }}
                />
              )}
            </td>

            {/* Vertical divider - using border-left in a separate cell for Outlook */}
            <td
              width="2"
              style={{
                width: '2px',
                backgroundColor: dividerColor,
                padding: '0',
                border: 'none',
                borderWidth: '0',
                margin: '0',
                outline: 'none',
              }}
            >
              &nbsp;
            </td>

            {/* Content cell */}
            <td
              valign="top"
              style={{
                padding: '0 0 0 15px',
                border: 'none',
                borderWidth: '0',
                margin: '0',
                outline: 'none',
              }}
            >
              <table
                cellPadding={0}
                cellSpacing={0}
                border={0}
                style={{
                  borderCollapse: 'collapse',
                  border: 'none',
                  borderSpacing: '0',
                  borderWidth: '0',
                  margin: '0',
                  padding: '0',
                  outline: 'none',
                }}
              >
                <tbody
                  style={{
                    border: 'none',
                    borderWidth: '0',
                    margin: '0',
                    padding: '0',
                    outline: 'none',
                  }}
                >
                  <tr
                    style={{
                      border: 'none',
                      borderWidth: '0',
                      margin: '0',
                      padding: '0',
                      outline: 'none',
                    }}
                  >
                    <td
                      style={{
                        padding: '0 0 4px 0',
                        border: 'none',
                        borderWidth: '0',
                        margin: '0',
                        outline: 'none',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: safeTextColor,
                          outline: 'none',
                          border: 'none',
                          margin: '0',
                          padding: '0',
                        }}
                      >
                        {fullName}
                      </div>
                    </td>
                  </tr>

                  {jobTitle && (
                    <tr
                      style={{
                        border: 'none',
                        borderWidth: '0',
                        margin: '0',
                        padding: '0',
                        outline: 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '0 0 8px 0',
                          border: 'none',
                          borderWidth: '0',
                          margin: '0',
                          outline: 'none',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '12px',
                            color: defaultTextColor,
                            outline: 'none',
                          }}
                        >
                          {jobTitle}
                        </div>
                      </td>
                    </tr>
                  )}

                  {showOfficePhone && officePhone && (
                    <tr
                      style={{
                        border: 'none',
                        borderWidth: '0',
                        margin: '0',
                        padding: '0',
                        outline: 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '0 0 4px 0',
                          border: 'none',
                          borderWidth: '0',
                          margin: '0',
                          outline: 'none',
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '12px',
                        }}
                      >
                        <strong
                          style={{
                            color: safeTextColor,
                            outline: 'none',
                            border: 'none',
                            margin: '0',
                            padding: '0',
                          }}
                        >
                          Office:{' '}
                        </strong>
                        {officePhone}
                      </td>
                    </tr>
                  )}

                  {showMobilePhone && mobilePhone && (
                    <tr
                      style={{
                        border: 'none',
                        borderWidth: '0',
                        margin: '0',
                        padding: '0',
                        outline: 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '0 0 4px 0',
                          border: 'none',
                          borderWidth: '0',
                          margin: '0',
                          outline: 'none',
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '12px',
                        }}
                      >
                        <strong
                          style={{
                            color: safeTextColor,
                            outline: 'none',
                            border: 'none',
                            margin: '0',
                            padding: '0',
                          }}
                        >
                          Mobile:{' '}
                        </strong>
                        {mobilePhone}
                      </td>
                    </tr>
                  )}

                  {email && (
                    <tr
                      style={{
                        border: 'none',
                        borderWidth: '0',
                        margin: '0',
                        padding: '0',
                        outline: 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '0 0 4px 0',
                          border: 'none',
                          borderWidth: '0',
                          margin: '0',
                          outline: 'none',
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '12px',
                        }}
                      >
                        <strong
                          style={{
                            color: safeTextColor,
                            outline: 'none',
                            border: 'none',
                            margin: '0',
                            padding: '0',
                          }}
                        >
                          Email:{' '}
                        </strong>
                        <a
                          href={`mailto:${email}`}
                          style={{
                            color: defaultTextColor,
                            textDecoration: 'none',
                            outline: 'none',
                            border: 'none',
                            margin: '0',
                            padding: '0',
                          }}
                        >
                          {email}
                        </a>
                      </td>
                    </tr>
                  )}

                  {website && (
                    <tr
                      style={{
                        border: 'none',
                        borderWidth: '0',
                        margin: '0',
                        padding: '0',
                        outline: 'none',
                      }}
                    >
                      <td
                        style={{
                          padding: '0 0 4px 0',
                          border: 'none',
                          borderWidth: '0',
                          margin: '0',
                          outline: 'none',
                          fontFamily: 'Arial, sans-serif',
                          fontSize: '12px',
                        }}
                      >
                        <strong
                          style={{
                            color: safeTextColor,
                            outline: 'none',
                            border: 'none',
                            margin: '0',
                            padding: '0',
                          }}
                        >
                          Web:{' '}
                        </strong>
                        <a
                          href={website.startsWith('http') ? website : `https://${website}`}
                          style={{
                            color: defaultTextColor,
                            textDecoration: 'none',
                            outline: 'none',
                            border: 'none',
                            margin: '0',
                            padding: '0',
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
                  <tr
                    style={{
                      border: 'none',
                      borderWidth: '0',
                      margin: '0',
                      padding: '0',
                      outline: 'none',
                    }}
                  >
                    <td
                      style={{
                        padding: '10px 0 0 0',
                        border: 'none',
                        borderWidth: '0',
                        margin: '0',
                        outline: 'none',
                      }}
                    >
                      <table
                        cellPadding={0}
                        cellSpacing={0}
                        border={0}
                        style={{
                          borderCollapse: 'collapse',
                          border: 'none',
                          borderSpacing: '0',
                          borderWidth: '0',
                          margin: '0',
                          padding: '0',
                          outline: 'none',
                        }}
                      >
                        <tbody
                          style={{
                            border: 'none',
                            borderWidth: '0',
                            margin: '0',
                            padding: '0',
                            outline: 'none',
                          }}
                        >
                          <tr
                            style={{
                              border: 'none',
                              borderWidth: '0',
                              margin: '0',
                              padding: '0',
                              outline: 'none',
                            }}
                          >
                            {enabledSocial.x && socialMedia.x && (
                              <td
                                style={{
                                  padding: '0 8px 0 0',
                                  border: 'none',
                                  borderWidth: '0',
                                  margin: '0',
                                  outline: 'none',
                                }}
                              >
                                <a
                                  href={socialMedia.x}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{ border: 'none', margin: '0', padding: '0' }}
                                >
                                  <img
                                    src={icons.x || '/placeholder.svg'}
                                    alt="X (Twitter)"
                                    width="20"
                                    height="20"
                                    style={{
                                      display: 'block',
                                      border: '0',
                                      margin: '0',
                                      padding: '0',
                                      outline: 'none',
                                      border: 'none',
                                    }}
                                  />
                                </a>
                              </td>
                            )}
                            {enabledSocial.facebook && socialMedia.facebook && (
                              <td
                                style={{
                                  padding: '0 8px 0 0',
                                  border: 'none',
                                  borderWidth: '0',
                                  margin: '0',
                                  outline: 'none',
                                }}
                              >
                                <a
                                  href={socialMedia.facebook}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{ border: 'none', margin: '0', padding: '0' }}
                                >
                                  <img
                                    src={icons.facebook || '/placeholder.svg'}
                                    alt="Facebook"
                                    width="20"
                                    height="20"
                                    style={{
                                      display: 'block',
                                      border: '0',
                                      margin: '0',
                                      padding: '0',
                                      outline: 'none',
                                      border: 'none',
                                    }}
                                  />
                                </a>
                              </td>
                            )}
                            {enabledSocial.instagram && socialMedia.instagram && (
                              <td
                                style={{
                                  padding: '0 8px 0 0',
                                  border: 'none',
                                  borderWidth: '0',
                                  margin: '0',
                                  outline: 'none',
                                }}
                              >
                                <a
                                  href={socialMedia.instagram}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{ border: 'none', margin: '0', padding: '0' }}
                                >
                                  <img
                                    src={icons.instagram || '/placeholder.svg'}
                                    alt="Instagram"
                                    width="20"
                                    height="20"
                                    style={{
                                      display: 'block',
                                      border: '0',
                                      margin: '0',
                                      padding: '0',
                                      outline: 'none',
                                      border: 'none',
                                    }}
                                  />
                                </a>
                              </td>
                            )}
                            {enabledSocial.google && socialMedia.google && (
                              <td
                                style={{
                                  padding: '0 8px 0 0',
                                  border: 'none',
                                  borderWidth: '0',
                                  margin: '0',
                                  outline: 'none',
                                }}
                              >
                                <a
                                  href={socialMedia.google}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{ border: 'none', margin: '0', padding: '0' }}
                                >
                                  <img
                                    src={icons.google || '/placeholder.svg'}
                                    alt="Google"
                                    width="20"
                                    height="20"
                                    style={{
                                      display: 'block',
                                      border: '0',
                                      margin: '0',
                                      padding: '0',
                                      outline: 'none',
                                      border: 'none',
                                    }}
                                  />
                                </a>
                              </td>
                            )}
                            {enabledSocial.youtube && socialMedia.youtube && (
                              <td
                                style={{
                                  padding: '0',
                                  border: 'none',
                                  borderWidth: '0',
                                  margin: '0',
                                  outline: 'none',
                                }}
                              >
                                <a
                                  href={socialMedia.youtube}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{ border: 'none', margin: '0', padding: '0' }}
                                >
                                  <img
                                    src={icons.youtube || '/placeholder.svg'}
                                    alt="YouTube"
                                    width="20"
                                    height="20"
                                    style={{
                                      display: 'block',
                                      border: '0',
                                      margin: '0',
                                      padding: '0',
                                      outline: 'none',
                                      border: 'none',
                                    }}
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
          cellPadding={0}
          cellSpacing={0}
          border={0}
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            maxWidth: '550px',
            marginTop: '15px',
            borderTop: `2px solid ${dividerColor}`,
            border: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            borderBottom: 'none',
            borderSpacing: '0',
            borderWidth: '0',
          }}
        >
          <tbody style={{ border: 'none' }}>
            <tr style={{ border: 'none' }}>
              <td style={{ paddingTop: '15px', border: 'none', borderWidth: '0' }}>
                <p
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '9px',
                    color: defaultTextColor,
                    margin: '0',
                    lineHeight: '1.3',
                    maxWidth: '550px',
                    outline: 'none',
                    border: 'none',
                    padding: '0',
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
  );
}
