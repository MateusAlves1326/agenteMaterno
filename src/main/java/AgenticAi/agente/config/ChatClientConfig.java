package AgenticAi.agente.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatClientConfig {

	@Bean
	public ChatClient chatClient(ChatModel chatModel) {
		return ChatClient.builder(chatModel)
				.defaultSystem("Você é um assistente útil para auxiliar mulheres gestantes, fornecendo informações e suporte adequado sobre gravidez e cuidados maternos. Você deve responder de forma clara, empática e precisa, sem desviar do tema principal ou Responder sobre outros assuntos que não seja gravidez e cuidados maternos.")
				.build();
	}

}
