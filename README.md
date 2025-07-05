# 🇨🇦 Oh Sorry! Politeness Filter

A delightful Next.js application that transforms direct or rude statements into super polite, Canadian-style speech using AI voice input and text transformation.

## 🎯 Prize Targets

- ✅ **The Geminis (Most Canadian Agent)**
- ✅ **Best Voice Agent**
- ✅ **Best Design (Vercel)**

## 🚀 Features

- **🎤 Voice Input**: Record your voice and get instant transcription
- **🤖 AI Transformation**: Convert direct statements into polite Canadian speech
- **📱 Beautiful UI**: Modern, responsive design with Canadian theming
- **🔊 Text-to-Speech**: Hear your polite version spoken aloud
- **📋 Copy to Clipboard**: Easy sharing of your Canadianified text

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Voice Processing**: Web Speech API + OpenAI Whisper
- **AI Text Transformation**: OpenAI GPT-3.5-turbo
- **Styling**: Tailwind CSS with custom Canadian theme

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd hackathon
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   Get your OpenAI API key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎤 How to Use

1. **Voice Input**: Click "Start Recording" and speak your direct statement
2. **Text Input**: Or type your message in the text area
3. **Transform**: Click "🍁 Canadianify It!" to get your polite version
4. **Share**: Copy to clipboard or hear it spoken aloud

## 🍁 Examples

| Direct Statement | Canadian Polite Version                                                               |
| ---------------- | ------------------------------------------------------------------------------------- |
| "Move your car"  | "Hey sorry, could you kindly move your car when you have a moment? Thanks so much!"   |
| "Shut up"        | "Oh sorry, would you mind keeping it down a bit? Thanks kindly, eh!"                  |
| "Hurry up"       | "Hey sorry, could you maybe pick up the pace when you have a chance? Thanks so much!" |

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── transcribe/route.js    # Speech-to-text API
│   │   └── polite/route.js        # Text transformation API
│   ├── page.js                    # Main application page
│   ├── layout.js                  # App layout
│   └── globals.css                # Global styles
├── components/                    # React components (if any)
└── ...
```

## 🔧 API Endpoints

### POST `/api/transcribe`

Transcribes audio to text using OpenAI Whisper.

**Request:**

```json
{
  "audioData": "base64_encoded_audio_data"
}
```

**Response:**

```json
{
  "text": "transcribed text",
  "success": true
}
```

### POST `/api/polite`

Transforms text into polite Canadian speech.

**Request:**

```json
{
  "text": "Move your car"
}
```

**Response:**

```json
{
  "politeText": "Hey sorry, could you kindly move your car when you have a moment? Thanks so much!",
  "success": true
}
```

## 🎨 Design Features

- **Canadian Theme**: Red and white color scheme with maple leaf emojis
- **Responsive Design**: Works perfectly on desktop and mobile
- **Smooth Animations**: Loading states and transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Modern UI**: Clean, professional interface with excellent UX

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` environment variable
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- OpenAI for providing the Whisper and GPT APIs
- Next.js team for the amazing framework
- Tailwind CSS for the beautiful styling system
- The Canadian people for their legendary politeness, eh!

---

Made with ❤️ for the most Canadian hackathon experience! 🇨🇦🍁
