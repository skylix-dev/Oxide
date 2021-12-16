import mergeDeep from "merge-deep";

function mergeData<ObjectType>(
	mainData: ObjectType,
	mergeData: ObjectType
): ObjectType;
function mergeData(mainData: string, mergeData: string): string;
function mergeData(mainData: number, mergeData: number): number;

function mergeData(mainData: any, mergingData: any): any {
	if (typeof mainData == "object") {
		return mergeDeep(mainData, mergingData);
	} else if (typeof mainData == "string") {
		return mainData + mergingData;
	} else {
		return mainData + mergingData;
	}
}

export { mergeData };
