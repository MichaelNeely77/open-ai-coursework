import * as dotenv from 'dotenv';
import {Configuration, OpenAIApi} from 'openai';


dotenv.config({path:__dirname + '/.env'});


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function(req, res) {

    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured"
            }
        });
        return;
    }

    const animal = req.body.animal || '';

    // if (animal.length === 0) {
    //     res.status(400).json({
    //         error: {
    //             message: "Please enter an animal name"
    //         }
    //     });
    // return;
    // }




    try{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Suggest three pet names for ${animal}`,
            temperature: 0.8,
            max_tokens: 60
        });
        res.status(200).json({result: response.data.choices[0].text})
    } catch(error)  {
        if(error.response) {
            console.log(error(error.response.status, error.response.data));
            res.status(error.response.status).json(error.response.data);
        } else {
            console.log(`Error with OpenAI request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your API request'
                }
            });
        }
    }

    }


