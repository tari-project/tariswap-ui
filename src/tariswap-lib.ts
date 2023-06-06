const swap = (account: string, tariswap: string, input_res: string, input_amount: string, output_resource: string) => {
    console.log("swap");
    console.log({ account, tariswap, input_res, input_amount, output_resource });
};

const addLiquidity = (account: string, tariswap: string, res_a: string, amount_a: string, res_b: string, amount_b: string) => {
    console.log("add liquidity");
    console.log({ account, tariswap, res_a, amount_a, res_b, amount_b });
};

const removeLiquidity = (account: string, tariswap: string, res_lp: string, amount_lp: string ) => {
    console.log("remove liquidity");
    console.log({ account, tariswap, res_lp, amount_lp });
};

export { swap, addLiquidity, removeLiquidity};