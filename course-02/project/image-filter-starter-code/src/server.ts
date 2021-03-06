import { Request, Response } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {


  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  app.get('/filteredimage', async (req: Request, res: Response) => {
  // IT SHOULD
  //    1
  //    1. validate the image_url query
      const { image_url } = req.query;
  //    2. call filterImageFromURL(image_url) to filter the image
      if (!image_url) {
        return res.status(422).send("An image URL is required!!!");
      }
      try {
        const filteredImg = await filterImageFromURL(image_url);
  //    3. send the resulting file in the response 
  // making branch and push
        res.status(200).sendFile(filteredImg, () => {
  //    4. deletes any files on the server on finish of the response 
          deleteLocalFiles([filteredImg]);
        });
      } catch (error) {
        res.status(406).send("Invalid URL!!");
      }
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
  // let { fileName } = req.params;
  // const url = AWS.putImageUrl(fileName);
  // res.status(201).send({url: url});
});
  /**************************************************************************** */

  //! END @TODO1
  


  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();