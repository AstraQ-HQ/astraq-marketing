export default function CookiesPage() {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-mono text-5xl text-primary mb-2">Cookie Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: December 27, 2024
        </p>

        <div className="prose prose-sm max-w-none">
          <h2 className="font-mono text-2xl text-primary mt-8 mb-4">
            1. What are Cookies?
          </h2>
          <p className="text-muted-foreground mb-4">
            Cookies are small pieces of data stored on your device. They help us
            recognize you and provide a better user experience on the AstraQ
            website.
          </p>

          <h2 className="font-mono text-2xl text-primary mt-8 mb-4">
            2. Types of Cookies We Use
          </h2>
          <p className="text-muted-foreground mb-4">
            We use essential cookies to provide core website functionality,
            analytical cookies to understand how you use our site, and marketing
            cookies to track your interactions across websites.
          </p>

          <h2 className="font-mono text-2xl text-primary mt-8 mb-4">
            3. Your Cookie Choices
          </h2>
          <p className="text-muted-foreground mb-4">
            You can control cookie preferences through your browser settings.
            However, disabling cookies may affect the functionality of our
            website.
          </p>

          <h2 className="font-mono text-2xl text-primary mt-8 mb-4">
            4. Third-Party Cookies
          </h2>
          <p className="text-muted-foreground mb-4">
            Our website may use third-party services that place cookies on your
            device. We are not responsible for the cookie policies of
            third-party services.
          </p>

          <h2 className="font-mono text-2xl text-primary mt-8 mb-4">
            5. Contact Us
          </h2>
          <p className="text-muted-foreground">
            If you have questions about our cookie policy, please contact us at
            privacy@astraq.io
          </p>
        </div>
      </div>
    </section>
  );
}
