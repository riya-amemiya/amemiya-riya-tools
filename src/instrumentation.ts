export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { BaselimeSDK, VercelPlugin, BetterHttpInstrumentation } =
      // @ts-ignore
      await import("@baselime/node-opentelemetry");

    const sdk = new BaselimeSDK({
      serverless: true,
      service: "amemiya-riya-tools",
      instrumentations: [
        new BetterHttpInstrumentation({
          plugins: [
            // Add the Vercel plugin to enable correlation between your logs and traces for projects deployed on Vercel
            new VercelPlugin(),
          ],
        }),
      ],
    });

    sdk.start();
  }
}
