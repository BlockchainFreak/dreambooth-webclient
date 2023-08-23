import { z } from "zod";
import { Zodios, ZodiosEndpointParameter } from "@zodios/core"

const createQueries = (maps: Record<string, z.ZodType<any>>) => {
    return Object.entries(maps).map(([key, value]) => ({
        name: key,
        type: "Query",
        schema: value
    })) as ZodiosEndpointParameter[]
}

export const podApi = new Zodios("/path", [
    {
        alias: "dreamboothUploadImage",
        method: "post",
        path: "/dreambooth/upload",
        parameters: [
            ...createQueries({
                "model_name": z.string(),
                "instance_name": z.string(),
                "create_concept": z.boolean().default(true),
                "api_key": z.string().default(""),
            }),
            {
                name: "imageList",
                type: "Body",
                schema: z.object({
                    imageList: z.array(z.object({
                        data: z.string(),
                        name: z.string(),
                        txt: z.string().describe("Caption text for the image").default(""),
                    }))
                })
            }
        ],
        response: z.string()
    },
    {
        alias: "createModel",
        path: "/dreambooth/createModel",
        method: "post",
        paramters: createQueries({
            "new_model_name": z.string(),
            "new_model_src": z.string(),
            "new_model_shared_src": z.string().optional(),
            "create_from_hub": z.boolean().default(false),
            "new_model_url": z.string().optional(),
            "is_512": z.boolean().default(false),
            "train_unfrozen": z.boolean().default(true),
            "new_model_token": z.string().optional(),
            "new_model_extract_ema": z.boolean().default(false),
            "api_key": z.string().default(""),
        }),
        response: z.string()
    },
    {
        alias: "getModels",
        path: "/dreambooth/models",
        method: "get",
        parameters: createQueries({ "api_key": z.string().default("") }),
        response: z.any()
    },

])