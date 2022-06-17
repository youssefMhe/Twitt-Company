// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Tweet} from "../../typing";

type Data = {
    tweets: Tweet[]
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    //res.status(200).json({ username: 'John Doe' })
}
