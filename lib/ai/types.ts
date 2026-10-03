/** Provider-neutral boundary for the future AI team; no provider SDK is coupled to product code. */
export interface AIProvider {
  generate(input: { prompt: string; businessId: string }): Promise<{ text: string }>;
  analyze(input: { content: string; businessId: string }): Promise<{ summary: string }>;
  research(input: { topic: string; businessId: string }): Promise<{ findings: string[] }>;
}
