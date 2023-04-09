import { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse){
    const token = 'IGQVJVMHdUeTR2aEdBamVNQWdOWVdGLXZADMXlrZAUhGR2d1eWFLc0Y4S29uUmV6dUZAnU04xaC1NaUF5UFpoTGJ2WFFVa1BOTUFZAYmZAZAWGpYbVcwWVBXeGV4RTVTNnZASeDRzQVNkaXVJQmprX0NzUDJWeQZDZD'
    let url = `https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url,caption&&access_token=${token}`;
     fetch(url,      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(response => response.json()).then((reponse) =>{
            console.log(...reponse)
            res
            .status(200)
            .json({...reponse})}
        )
        .catch((error: any) => {
            console.error(error.message)
            res
            .status(500)
            .json({error: error})});
}