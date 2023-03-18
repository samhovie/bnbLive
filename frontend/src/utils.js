

const normalize = (data) => data.reduce((obj,ele) => ({ ...obj, [ele.id]: ele }), {});

export default normalize;
