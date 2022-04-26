import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date')
export class DateScalar implements CustomScalar<string, Date> {
	description = 'Date custom scalar type';

	parseValue(value: number): Date {
		return new Date(value); // value from the client
	}

	serialize(value: Date): string {
		const date = new Date(value);
		return new Date(
			date.getTime() - date.getTimezoneOffset() * 60000,
		).toISOString(); // value sent to the client
	}

	parseLiteral(ast: ValueNode): Date {
		if (ast.kind === Kind.INT) {
			return new Date(ast.value);
		}
		return null;
	}
}
