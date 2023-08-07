export const calculateNumberOfIncrements = (
    offset: number,
    blockProperty: number,
): number => {
    const threshold = 0.7;

    const isPositive = offset > 0;

    let numberOfIncrements = Math.floor(Math.abs(offset / blockProperty));

    const leftOver =
        Math.abs(offset % blockProperty) >= threshold * blockProperty ? 1 : 0;

    numberOfIncrements += leftOver;

    numberOfIncrements = isPositive
        ? numberOfIncrements
        : numberOfIncrements * -1;

    return numberOfIncrements;
};
