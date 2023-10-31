import { Injectable } from '@nestjs/common';
import { getAuth as getAuthadmin } from 'firebase-admin/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { VentChoice } from '@interface/vent_choice.interface';

@Injectable()
class VentChoiceService {
  private readonly ventchoice: VentChoice[] = [];
  private ventchoiceresultcount = {
    message: '',
    count: 0,
    result: null,
  };
  private ventchoiceresult = {
    message: '',
    result: null,
  };

  async findOne(id: string): Promise<any> {
    const Oneventchoice = async (id: string) => {
      this.ventchoice.length = 0;
    };
    await Oneventchoice(id);
    return this.ventchoiceresult;
  }

  async findAll(): Promise<any> {
    const listAllventchoice = async () => {
      this.ventchoice.length = 0;

      return this.ventchoiceresult;
    };
    await listAllventchoice();
    return this.ventchoiceresult;
  }

  async findCount(): Promise<any> {
    const listAllventchoice = async () => {
      this.ventchoice.length = 0;
    };
    await listAllventchoice();
    return this.ventchoiceresultcount;
  }

  async create(choice: string) {
    this.ventchoice.length = 0;

    return this.ventchoiceresult;
  }

  async update(id: string) {
    this.ventchoice.length = 0;

    return this.ventchoiceresult;
  }

  async delete(id: string) {
    this.ventchoice.length = 0;

    return this.ventchoiceresult;
  }
}

export default VentChoiceService;
