const deepClean = (obj: Record<any, any>) => {
	const isObject = (value): boolean =>
		Object.prototype.toString.call(value) ===
		Object.prototype.toString.call({});
	const isEmptyObject = (value) =>
		isObject(value) && Object.keys(value).length === 0;
	const isEmptyValue = (value) => value === null || value === '';
	const mustBeDeleted = (value) => isEmptyValue(value) || isEmptyObject(value);

	if (!isObject(obj)) throw new Error('Input parameter must be an object');

	const copy = JSON.parse(JSON.stringify(obj));
	const clean = (copy) =>
		Object.keys(copy).reduce((acc, key) => {
			let value = copy[key];
			if (isObject(value) && !isEmptyObject(value)) value = clean(value);
			if (!mustBeDeleted(value)) acc[key] = value;
			return acc;
		}, {});

	return clean(obj);
};

export default deepClean;
