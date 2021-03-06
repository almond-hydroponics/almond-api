import { join } from 'path';

import { GraphQLDefinitionsFactory } from '@nestjs/graphql';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory
	.generate({
		typePaths: ['./**/*.schema.graphql'],
		path: join(process.cwd(), 'src/graphql.schema.ts'),
		outputAs: 'class',
		defaultScalarType: 'unknown',
		customScalarTypeMapping: {
			DateTime: 'Date',
		},
	})
	.finally(() => console.log('Graphql type generation complete.'));
