import { TariConnection } from "tari-connector/src";

async function swap(tari: TariConnection, account: string, tariswap: string, input_res: string, input_amount: number, output_resource: string) {
    console.log("swap");
    console.log({ account, tariswap, input_res, input_amount, output_resource });

    let res = await tari.sendMessage("transactions.submit", tari.token,
    /*signing_key_index: */ null,
    /*fee_instructions":*/[],
    /*instructions":*/[
            {
                "CallMethod": {
                    "component_address": account,
                    "method": "withdraw",
                    "args": [input_res, input_amount.toString()]
                }
            },
            {
                "PutLastInstructionOutputOnWorkspace": {
                    "key": [97, 95, 98, 117, 99, 107, 101, 116]
                }
            },
            {
                "CallMethod": {
                    "component_address": tariswap,
                    "method": "swap",
                    "args": [
                        { "Workspace": [97, 95, 98, 117, 99, 107, 101, 116] }, output_resource]
                }
            },
            {
                "PutLastInstructionOutputOnWorkspace": {
                    "key": [98, 95, 98, 117, 99, 107, 101, 116]
                }
            },
            {
                "CallMethod": {
                    "component_address": account,
                    "method": "deposit",
                    "args": [{ "Workspace": [98, 95, 98, 117, 99, 107, 101, 116] }]
                }
            }
        ],
    /*inputs":*/[{ "address": account }, { "address": tariswap }],
    /*override_inputs":*/ false,
    /*new_outputs":*/ 3,
    /*specific_non_fungible_outputs":*/[],
    /*new_resources":*/[],
    /*new_non_fungible_outputs":*/[],
    /*new_non_fungible_index_outputs":*/[],
    /*is_dry_run":*/ false,
    /*proof_ids":*/[]
    );

    console.log({ res });
};

async function addLiquidity(tari: TariConnection, account: string, tariswap: string, res_a: string, amount_a: number, res_b: string, amount_b: number) {
    console.log("add liquidity");
    console.log({ account, tariswap, res_a, amount_a, res_b, amount_b });

    let res = await tari.sendMessage("transactions.submit", tari.token,
    /*signing_key_index: */ null,
    /*fee_instructions":*/[],
    /*instructions":*/[
            {
                "CallMethod": {
                    "component_address": account,
                    "method": "withdraw",
                    "args": [res_a, amount_a.toString()]
                }
            },
            {
                "PutLastInstructionOutputOnWorkspace": {
                    "key": [97, 95, 98, 117, 99, 107, 101, 116]
                }
            },
            {
                "CallMethod": {
                    "component_address": account,
                    "method": "withdraw",
                    "args": [res_b, amount_b.toString()]
                }
            },
            {
                "PutLastInstructionOutputOnWorkspace": {
                    "key": [98, 95, 98, 117, 99, 107, 101, 116]
                }
            },
            {
                "CallMethod": {
                    "component_address": tariswap,
                    "method": "add_liquidity",
                    "args": [
                        { "Workspace": [97, 95, 98, 117, 99, 107, 101, 116] }, { "Workspace": [98, 95, 98, 117, 99, 107, 101, 116] }]
                }
            },
            {
                "PutLastInstructionOutputOnWorkspace": {
                    "key": [108, 112, 95, 98, 117, 99, 107, 101, 116]
                }
            },
            {
                "CallMethod": {
                    "component_address": account,
                    "method": "deposit",
                    "args": [{ "Workspace": [108, 112, 95, 98, 117, 99, 107, 101, 116] }]
                }
            }
        ],
    /*inputs":*/[{ "address": account }, { "address": tariswap }],
    /*override_inputs":*/ false,
    /*new_outputs":*/ 3,
    /*specific_non_fungible_outputs":*/[],
    /*new_resources":*/[],
    /*new_non_fungible_outputs":*/[],
    /*new_non_fungible_index_outputs":*/[],
    /*is_dry_run":*/ false,
    /*proof_ids":*/[]
    );

    console.log({ res });
};

async function removeLiquidity(tari: TariConnection, account: string, tariswap: string, res_lp: string, amount_lp: number) {
    console.log("remove liquidity");
    console.log({ account, tariswap, res_lp, amount_lp });

    let res = await tari.sendMessage("transactions.submit", tari.token,
    /*signing_key_index: */ null,
    /*fee_instructions":*/[],
    /*instructions":*/[
            {
                "CallMethod": {
                    "component_address": account,
                    "method": "withdraw",
                    "args": [res_lp, amount_lp.toString()]
                }
            },
            {
                "PutLastInstructionOutputOnWorkspace": {
                    "key": [108, 112, 95, 98, 117, 99, 107, 101, 116]
                }
            },
            {
                "CallMethod": {
                    "component_address": tariswap,
                    "method": "remove_liquidity",
                    "args": [
                        { "Workspace": [108, 112, 95, 98, 117, 99, 107, 101, 116] }]
                }
            },
            {
                "PutLastInstructionOutputOnWorkspace": {
                    "key": [112, 111, 111, 108, 95, 98, 117, 99, 107, 101, 116, 115]
                }
            },
            {
                "CallMethod": {
                    "component_address": account,
                    "method": "deposit",
                    "args": [{ "Workspace": [112, 111, 111, 108, 95, 98, 117, 99, 107, 101, 116, 115, 46, 48] }]
                }
            },
            {
                "CallMethod": {
                    "component_address": account,
                    "method": "deposit",
                    "args": [{ "Workspace": [112, 111, 111, 108, 95, 98, 117, 99, 107, 101, 116, 115, 46, 49] }]
                }
            }
        ],
    /*inputs":*/[{ "address": account }, { "address": tariswap }],
    /*override_inputs":*/ false,
    /*new_outputs":*/ 3,
    /*specific_non_fungible_outputs":*/[],
    /*new_resources":*/[],
    /*new_non_fungible_outputs":*/[],
    /*new_non_fungible_index_outputs":*/[],
    /*is_dry_run":*/ false,
    /*proof_ids":*/[]
    );

    console.log({ res });
};

export { swap, addLiquidity, removeLiquidity };