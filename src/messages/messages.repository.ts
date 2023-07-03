import { readFile, writeFile } from 'fs/promises';
import * as path from 'path';

class MessagesRepository {
  private readonly FILE_PATH = path.join('data', 'messages.json');

  findAll() {
    return this.fetchAll();
  }

  async findById(id: number) {
    const messages = await this.fetchAll();
    if (!messages) return null;
    return messages.find((m: any) => m.id === id);
  }

  async create(message: string) {
    let messages = await this.fetchAll();
    if (!messages) {
      messages = [];
    }
    const newMsg = { id: Math.floor(Math.random() * 900), content: message };
    messages.push(newMsg);
    await writeFile(this.FILE_PATH, JSON.stringify(messages));
    return newMsg;
  }

  async edit(id: number, content: string) {
    const messages = await this.fetchAll();
    if (!messages) return undefined;

    const msgIndex = messages.findIndex((m: any) => m.id === id);
    if (msgIndex < 0) return undefined;

    messages[msgIndex].content = content;

    await writeFile(this.FILE_PATH, JSON.stringify(messages));
    return messages[msgIndex];
  }

  private async fetchAll() {
    const data = await readFile(this.FILE_PATH, 'utf8');
    return JSON.parse(data.toString());
  }
}

export default MessagesRepository;
