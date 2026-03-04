import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    industry: z.string(),
    challenge: z.string(),
    solution: z.string(),
    solutionCategory: z.enum(['embedded-talent', 'ai-workflow-transformation', 'marketing-operations']),
    results: z.array(z.object({
      metric: z.string(),
      value: z.string(),
    })),
    heroImage: z.string().optional(),
    publishedDate: z.date(),
    featured: z.boolean().default(false),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.enum(['AI & Automation', 'Thought Leadership', 'Podcasts', 'News', 'Blog']),
    author: z.string().default('AlgoMarketing'),
    publishedDate: z.date(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { 'case-studies': caseStudies, insights };
