# Yoga Studio Data Import Script

This script imports JSON data files into your Next.js app's PostgreSQL database.

## Usage Instructions

Run the script from the project root directory:

```bash
# Make sure you're in the Next.js project root directory
cd /Users/raphaelseghier/PYTHON/FINDYOGA/test_from_scratch

# Run the import script with a path to your JSON file
npx ts-node scripts/importData.ts "../all_data_sets/dataset_Kuwait City.json"
```

## Features

- Automatically uses your Next.js project's database configuration from `.env`
- Checks for duplicates based on `placeId` before importing
- Imports related data (reviews, opening hours, images) if available
- Provides statistics on successful imports and errors

## Importing Multiple Files

To import multiple JSON files, you can run the script multiple times with different file paths:

```bash
npx ts-node scripts/importData.ts "../all_data_sets/dataset_Kuwait City.json"
npx ts-node scripts/importData.ts "../all_data_sets/dataset_Beirut.json"
npx ts-node scripts/importData.ts "../all_data_sets/dataset_Tokyo.json"
```

For batch importing, you can create a shell script:

```bash
#!/bin/bash
for file in ../all_data_sets/dataset_*.json; do
  echo "Importing $file..."
  npx ts-node scripts/importData.ts "$file"
done
```

## Troubleshooting

- If you encounter `dotenv` module errors, install it with: `npm install dotenv`
- Make sure your `.env` file in the project root has the correct `DATABASE_URL`
- If schema doesn't match, check your Prisma models and run `npx prisma generate` 