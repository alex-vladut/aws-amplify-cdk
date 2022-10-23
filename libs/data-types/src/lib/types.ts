export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSTimestamp: number;
  AWSDateTime: string;
  AWSEmail: string;
  AWSPhone: string;
  AWSDate: string;
  AWSIPAddress: string;
  AWSJSON: string;
  AWSTime: string;
  AWSURL: string;
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  listUsers?: Maybe<ModelUserConnection>;
  syncUsers?: Maybe<ModelUserConnection>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryListUsersArgs = {
  filter?: InputMaybe<ModelUserFilterInput>;
  id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  sortDirection?: InputMaybe<ModelSortDirection>;
};


export type QuerySyncUsersArgs = {
  filter?: InputMaybe<ModelUserFilterInput>;
  lastSync?: InputMaybe<Scalars['AWSTimestamp']>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _deleted?: Maybe<Scalars['Boolean']>;
  _lastChangedAt: Scalars['AWSTimestamp'];
  _version: Scalars['Int'];
  createdAt: Scalars['AWSDateTime'];
  email: Scalars['AWSEmail'];
  id: Scalars['ID'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['AWSPhone']>;
  updatedAt: Scalars['AWSDateTime'];
};

export type ModelUserFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelUserFilterInput>>>;
  createdAt?: InputMaybe<ModelStringInput>;
  email?: InputMaybe<ModelStringInput>;
  id?: InputMaybe<ModelIdInput>;
  name?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelUserFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ModelUserFilterInput>>>;
  phone?: InputMaybe<ModelStringInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
};

export type ModelStringInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  beginsWith?: InputMaybe<Scalars['String']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  ge?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  le?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  notContains?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<ModelSizeInput>;
};

export enum ModelAttributeTypes {
  Null = '_null',
  Binary = 'binary',
  BinarySet = 'binarySet',
  Bool = 'bool',
  List = 'list',
  Map = 'map',
  Number = 'number',
  NumberSet = 'numberSet',
  String = 'string',
  StringSet = 'stringSet'
}

export type ModelSizeInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  eq?: InputMaybe<Scalars['Int']>;
  ge?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  le?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
};

export type ModelIdInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  beginsWith?: InputMaybe<Scalars['ID']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  ge?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  le?: InputMaybe<Scalars['ID']>;
  lt?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  notContains?: InputMaybe<Scalars['ID']>;
  size?: InputMaybe<ModelSizeInput>;
};

export enum ModelSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type ModelUserConnection = {
  __typename?: 'ModelUserConnection';
  items: Array<Maybe<User>>;
  nextToken?: Maybe<Scalars['String']>;
  startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  updateUser?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  condition?: InputMaybe<ModelUserConditionInput>;
  input: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  condition?: InputMaybe<ModelUserConditionInput>;
  input: DeleteUserInput;
};


export type MutationUpdateUserArgs = {
  condition?: InputMaybe<ModelUserConditionInput>;
  input: UpdateUserInput;
};

export type ModelUserConditionInput = {
  and?: InputMaybe<Array<InputMaybe<ModelUserConditionInput>>>;
  createdAt?: InputMaybe<ModelStringInput>;
  email?: InputMaybe<ModelStringInput>;
  name?: InputMaybe<ModelStringInput>;
  not?: InputMaybe<ModelUserConditionInput>;
  or?: InputMaybe<Array<InputMaybe<ModelUserConditionInput>>>;
  phone?: InputMaybe<ModelStringInput>;
  updatedAt?: InputMaybe<ModelStringInput>;
};

export type CreateUserInput = {
  _version?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['AWSDateTime']>;
  email: Scalars['AWSEmail'];
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  phone?: InputMaybe<Scalars['AWSPhone']>;
  updatedAt?: InputMaybe<Scalars['AWSDateTime']>;
};

export type DeleteUserInput = {
  _version?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
};

export type UpdateUserInput = {
  _version?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['AWSDateTime']>;
  email?: InputMaybe<Scalars['AWSEmail']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['AWSPhone']>;
  updatedAt?: InputMaybe<Scalars['AWSDateTime']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onCreateUser?: Maybe<User>;
  onDeleteUser?: Maybe<User>;
  onUpdateUser?: Maybe<User>;
};


export type SubscriptionOnCreateUserArgs = {
  filter?: InputMaybe<ModelSubscriptionUserFilterInput>;
  id?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnDeleteUserArgs = {
  filter?: InputMaybe<ModelSubscriptionUserFilterInput>;
  id?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnUpdateUserArgs = {
  filter?: InputMaybe<ModelSubscriptionUserFilterInput>;
  id?: InputMaybe<Scalars['String']>;
};

export type ModelSubscriptionUserFilterInput = {
  and?: InputMaybe<Array<InputMaybe<ModelSubscriptionUserFilterInput>>>;
  createdAt?: InputMaybe<ModelSubscriptionStringInput>;
  email?: InputMaybe<ModelSubscriptionStringInput>;
  name?: InputMaybe<ModelSubscriptionStringInput>;
  or?: InputMaybe<Array<InputMaybe<ModelSubscriptionUserFilterInput>>>;
  phone?: InputMaybe<ModelSubscriptionStringInput>;
  updatedAt?: InputMaybe<ModelSubscriptionStringInput>;
};

export type ModelSubscriptionStringInput = {
  beginsWith?: InputMaybe<Scalars['String']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  ge?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  le?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  notContains?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export enum AuthProvider {
  ApiKey = 'apiKey',
  Iam = 'iam',
  Oidc = 'oidc',
  UserPools = 'userPools'
}

export type AuthRule = {
  allow: AuthStrategy;
  groupClaim?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  groupsField?: InputMaybe<Scalars['String']>;
  identityClaim?: InputMaybe<Scalars['String']>;
  operations?: InputMaybe<Array<InputMaybe<ModelOperation>>>;
  ownerField?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<AuthProvider>;
};

export enum AuthStrategy {
  Groups = 'groups',
  Owner = 'owner',
  Private = 'private',
  Public = 'public'
}

export enum ModelOperation {
  Create = 'create',
  Delete = 'delete',
  Get = 'get',
  List = 'list',
  Listen = 'listen',
  Read = 'read',
  Search = 'search',
  Sync = 'sync',
  Update = 'update'
}

export type HttpHeader = {
  key?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export enum HttpMethod {
  Delete = 'DELETE',
  Get = 'GET',
  Patch = 'PATCH',
  Post = 'POST',
  Put = 'PUT'
}

export type ModelBooleanInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  eq?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
};

export type ModelFloatInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  eq?: InputMaybe<Scalars['Float']>;
  ge?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  le?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
};

export type ModelIntInput = {
  attributeExists?: InputMaybe<Scalars['Boolean']>;
  attributeType?: InputMaybe<ModelAttributeTypes>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  eq?: InputMaybe<Scalars['Int']>;
  ge?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  le?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
};

export type ModelMutationMap = {
  create?: InputMaybe<Scalars['String']>;
  delete?: InputMaybe<Scalars['String']>;
  update?: InputMaybe<Scalars['String']>;
};

export type ModelQueryMap = {
  get?: InputMaybe<Scalars['String']>;
  list?: InputMaybe<Scalars['String']>;
};

export type ModelSubscriptionBooleanInput = {
  eq?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
};

export type ModelSubscriptionFloatInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  eq?: InputMaybe<Scalars['Float']>;
  ge?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  le?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

export type ModelSubscriptionIdInput = {
  beginsWith?: InputMaybe<Scalars['ID']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  ge?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  le?: InputMaybe<Scalars['ID']>;
  lt?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  notContains?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type ModelSubscriptionIntInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  eq?: InputMaybe<Scalars['Int']>;
  ge?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  le?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export enum ModelSubscriptionLevel {
  Off = 'off',
  On = 'on',
  Public = 'public'
}

export type ModelSubscriptionMap = {
  level?: InputMaybe<ModelSubscriptionLevel>;
  onCreate?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  onDelete?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  onUpdate?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export enum PredictionsActions {
  ConvertTextToSpeech = 'convertTextToSpeech',
  IdentifyLabels = 'identifyLabels',
  IdentifyText = 'identifyText',
  TranslateText = 'translateText'
}

export type SearchableQueryMap = {
  search?: InputMaybe<Scalars['String']>;
};

export type TimestampConfiguration = {
  createdAt?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['String']>;
};
