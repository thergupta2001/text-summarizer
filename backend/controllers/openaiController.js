const OpenAI = require('openai')

const openai = new OpenAI({
     apiKey: process.env.OPENAI_API_SECRET
});

const main = async (req, res) => {
     const { text } = req.body
     // console.log(text);
     const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
               {
                    role: 'system',
                    content: 'You are a helpful assistant'
               },
               {
                    role: 'user',
                    content: `Summarize this text - "${text}"`
               }
          ],
          max_tokens: 100
     });

     const response = completion.choices[0].message.content;
     res.status(200).json({ result: response })
}

const completions = async (req, res) => {
     // const { text } = req.body;

     // const completion = await openai.completions.create({
     //      model: "gpt-3.5-turbo-instruct",
     //      prompt: `${text}`,
     //      max_tokens: 100,
     //      temperature: 0,
     // });

     // const response = completion;
     // res.status(200).json({ result: response })

     const { text } = req.body
     // console.log(text);
     const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
               {
                    role: 'system',
                    content: 'You are a helpful assistant'
               },
               {
                    role: 'user',
                    content: `${text} - PLease complete this text in the best way you can think of in user's perspective. They may be talking to someone else`
               }
          ],
          max_tokens: 100
     });

     const response = completion.choices[0].message.content;
     console.log(response)
     res.status(200).json({ result: response })
}

module.exports = {
     main, completions
}