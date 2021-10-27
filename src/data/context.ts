import path from 'path';
import { fileURLToPath } from 'url';

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));

// Local filesystem path to cache source data files.
export const DATA_DIR = path.join(DIRNAME, '../../../.cache');
