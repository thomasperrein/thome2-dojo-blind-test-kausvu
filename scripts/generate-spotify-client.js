import { mkdir, writeFile } from 'fs/promises';

import openapi from '../openapi.json' assert { type: 'json' };

const targetDirectory = 'src/lib/spotify/model';

async function generateSpotifyClient() {
  console.log('\nLaunched generate-spotify-client script');
  console.log('Generating Spotify client from OpenApi spec file...\n');
  await mkdir(targetDirectory, { recursive: true }); // Generate target directory

  const schemas = openapi.components.schemas;
  const typesToGenerate = Object.keys(schemas);

  for (const typeName of typesToGenerate) {
    const typeSchema = schemas[typeName];
    generateType(typeName, typeSchema);
  }
}

function generateType(typeName, typeSchema) {
  console.log(`Generating type ${typeName}...`);

  const generatedCode = getGeneratedCode(typeName, typeSchema);

  writeFile(`${targetDirectory}/${typeName}.ts`, generatedCode);
}

function getTypeFromSchema(type, schema) {
  const typeOfSchema = schema.type;
  const nameOfSchema = type;

  const required = schema.required ?? [];
  const properties = schema.properties ?? {};

  const conversionTypeInTS = {
    number: 'number',
    integer: 'number',
    string: 'string',
    boolean: 'boolean',
  };

  let strToReturn = '';
  let importStr = '';

  if (typeOfSchema in conversionTypeInTS) {
    strToReturn =
      'export type ' +
      nameOfSchema +
      ' = ' +
      conversionTypeInTS[typeOfSchema.toString()] +
      ' ;';
  } else if (typeOfSchema === 'object') {
    strToReturn = 'export type ' + nameOfSchema + ' = {\n';
    for (const keyInSchema of Object.keys(schema)) {
      if (keyInSchema === 'properties') {
        for (const nameOfField of Object.keys(schema[keyInSchema])) {
          const fieldRequirement = required.includes(nameOfField)
            ? ': '
            : '?: ';
          const typeOfFieldinTS = schema[keyInSchema][nameOfField]['type'];
          let typeOfField =
            typeOfFieldinTS in conversionTypeInTS
              ? conversionTypeInTS[typeOfFieldinTS.toString()]
              : typeOfFieldinTS;

          if ('$ref' in schema[keyInSchema][nameOfField]) {
            const ref = schema[keyInSchema][nameOfField]['$ref'];
            const parts = ref.split('/');
            const toImportString = parts[parts.length - 1];
            importStr +=
              `import { ` +
              toImportString +
              ` } from "./` +
              toImportString +
              `";\n`;
          }

          if (
            typeOfField === 'array' &&
            'type' in schema[keyInSchema][nameOfField]['items']
          ) {
            typeOfField =
              conversionTypeInTS[
                schema[keyInSchema][nameOfField]['items']['type'].toString()
              ];
          }

          strToReturn +=
            '\t' + nameOfField + fieldRequirement + typeOfField + ';\n';
        }
      }
    }
    strToReturn += '};';
  }
  return importStr + '\n' + strToReturn;
}

function getGeneratedCode(type, schema) {
  return getTypeFromSchema(type, schema);
}

generateSpotifyClient();
