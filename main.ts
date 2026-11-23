// Writes one short text to /output/entry.txt: a text written to make the
// AI judge feel curious. Node 22, stdlib only — no network, no randomness,
// no Date: the output is fully deterministic.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const TEXT =
  'Every morning the baker sets out one extra loaf, still warm, for the customer who never comes — and every morning, by noon, it is gone.';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Gate: the entry must be UTF-8 text of 1 to 280 Unicode code points, and
// not only white space — fail loudly instead of shipping an invalid entry.
const length = [...TEXT].length;
if (length < 1 || length > 280 || TEXT.trim().length === 0) {
  throw new Error(`entry.txt must be 1-280 characters, got ${length}`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), TEXT, 'utf8');
