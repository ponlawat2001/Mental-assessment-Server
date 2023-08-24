import { Injectable } from '@nestjs/common';
import { Users } from '../interface/users.interface';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
class UsersService {
  private readonly users: Users[] = [];
  private usersresultcount = {
    message: '',
    count: 0,
    result: [],
  };
  private usersresult = {
    message: '',
    result: [],
  };

  async findAll(): Promise<any> {
    const listAllUsers = async (nextPageToken?) => {
      this.users.length = 0;
      await getAuth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
          listUsersResult.users.forEach((userRecord) => {
            this.users.push({
              user_ID: userRecord.uid,
              avatar:
                userRecord.photoURL ??
                'https://cdn-icons-png.flaticon.com/512/1811/1811885.png',
              phone: userRecord.phoneNumber,
              displayname: userRecord.displayName,
              email: userRecord.email,
              create_at: userRecord.metadata.creationTime,
              update_at: userRecord.metadata.lastRefreshTime,
              lastsignin_at: userRecord.metadata.lastSignInTime,
            });
            this.usersresult.message = 'Ok';
            this.usersresult.result = this.users;
          });
          if (listUsersResult.pageToken) {
            listAllUsers(listUsersResult.pageToken);
          }
        })
        .catch((error) => {
          console.log('Error listing users:', error);
        });
    };
    await listAllUsers();
    return this.usersresult;
  }

  async findCount(): Promise<any> {
    const listAllUsers = async (nextPageToken?) => {
      this.users.length = 0;

      await getAuth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
          listUsersResult.users.forEach((userRecord) => {
            this.users.push({
              user_ID: userRecord.uid,
              avatar:
                userRecord.photoURL ??
                'https://cdn-icons-png.flaticon.com/512/1811/1811885.png',
              phone: userRecord.phoneNumber,
              displayname: userRecord.displayName,
              email: userRecord.email,
              create_at: userRecord.metadata.creationTime,
              update_at: userRecord.metadata.lastRefreshTime,
              lastsignin_at: userRecord.metadata.lastSignInTime,
            });
            this.usersresultcount.message = 'Ok';
            this.usersresultcount.count = this.users.length;
            this.usersresultcount.result = this.users;
          });
          if (listUsersResult.pageToken) {
            listAllUsers(listUsersResult.pageToken);
          }
        })
        .catch((error) => {
          console.log('Error listing users:', error);
        });
    };
    await listAllUsers();
    return this.usersresultcount;
  }
}

export default UsersService;
