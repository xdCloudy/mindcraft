import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const apiMap = {
    'openai': (await import('./gpt.js')).GPT,
    'gpt': (await import('./gpt.js')).GPT,
    'azure': (await import('./azure.js')).Azure,
    'gemini': (await import('./gemini.js')).Gemini,
    'claude': (await import('./claude.js')).Claude,
    'replicate': (await import('./replicate.js')).Replicate,
    'huggingface': (await import('./huggingface.js')).HuggingFace,
    'ollama': (await import('./ollama.js')).Ollama,
    'groq': (await import('./groq.js')).Groq,
    'mistral': (await import('./mistral.js')).Mistral,
    'openrouter': (await import('./openrouter.js')).OpenRouter,
    'glhf': (await import('./glhf.js')).GLHF,
    'deepseek': (await import('./deepseek.js')).DeepSeek,
    'qwen': (await import('./qwen.js')).Qwen,
    'grok': (await import('./grok.js')).Grok,
    'lmstudio': (await import('./lmstudio.js')).LMStudio,
    'vllm': (await import('./vllm.js')).VLLM,
    'hyperbolic': (await import('./hyperbolic.js')).Hyperbolic,
    'novita': (await import('./novita.js')).Novita,
    'cerebras': (await import('./cerebras.js')).Cerebras,
    'mercury': (await import('./mercury.js')).Mercury,
};

export function selectAPI(profile) {
    if (!profile.api) {
        if (profile.model) {
            const slash_index = profile.model.indexOf('/');
            if (slash_index !== -1) {
                const prefix = profile.model.substring(0, slash_index);
                if (apiMap[prefix]) {
                    profile.api = prefix;
                }
            }
        }
        if (!profile.api) {
            throw new Error('Unknown model:', profile.model);
        }
    }
    if (!apiMap[profile.api]) {
        throw new Error('Unknown api:', profile.api);
    }
    let model_name = profile.model.replace(profile.api + '/', ''); // remove prefix
    profile.model = model_name === "" ? null : model_name; // if model is empty, set to null
    return profile;
}

export function createModel(profile) {
    if (apiMap[profile.model]) {
        // if the model value is an api (instead of a specific model name)
        // then set model to null so it uses the default model for that api
        profile.model = null;
    }
    if (!apiMap[profile.api]) {
        throw new Error('Unknown api:', profile.api);
    }
    const model = new apiMap[profile.api](profile.model, profile.url, profile.params);
    return model;
}