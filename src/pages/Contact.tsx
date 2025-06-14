
import ContactForm from "@/components/contact/ContactForm";
import SocialLinks from "@/components/contact/SocialLinks";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a question, want to collaborate, or just say hello? 
            I'd love to hear from you. Drop me a message below!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Info & Social Links */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Me</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    I'm always open to discussing new opportunities, interesting projects, 
                    or just having a good conversation about technology and development.
                  </p>
                  <p>
                    Feel free to reach out through the form or connect with me on social media. 
                    I typically respond within 24-48 hours.
                  </p>
                </div>
              </div>

              <SocialLinks />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
