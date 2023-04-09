import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: any) {
    console.log('new revalidate')
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
        console.log('Invalid token')
      return res.status(401).json({ message: 'Invalid token' })
    }

    if(!req.query.path){
        console.log('Invalid path')
        return res.status(401).json({ message: 'invalid path' })
    }
    console.log('validate path:'+ req.query.path )

    try {
      await res.revalidate(req.query.path)
      console.log('revalidate done for path:'+ req.query.path )
      return res.json({ revalidated: true, path: req.query.path })
    } catch (err: any) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send(err.message)
    }
  }