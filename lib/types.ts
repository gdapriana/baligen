export interface routesProps {
  name: string,
  route: string
}

export interface UserProps {
  id: string
  name?: string
  email: string
  emailVerified?: string
  image?: string
  accounts: AccountProps[]
  sessions: SessionProps[]
  Authenticator: AuthenticatorProps[]

  ratedDestinations: UsersRateDestinationsProps[]
  favoritedDestinations: UsersFavoriteDestinationsProps[]
  favoritedStories: UsersFavoriteStoriesProps[]
  favoritedCultures: UsersFavoriteCulturesProps[]
  commentedDestinations: UsersCommentDestinationsProps[]
  commentedStories: UsersCommentStoriesProps[]
  commentedCultures: UsersCommentCulturesProps[]
  stories: StoryProps[]
  createdAt: string
  updatedAt: string
}

export interface AccountProps {
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token?: string
  access_token?: string
  expires_at?: number
  token_type?: string
  scope?: string
  id_token?: string
  session_state?: string
  createdAt: string
  updatedAt: string
  user: UserProps
}

export interface SessionProps {
  sessionToken: string
  userId: string
  expires: string 
  user: UserProps
  createdAt: string
  updatedAt: string
}
 
export interface VerificationTokenProps {
  identifier: string
  token: string
  expires: string
}
 
export interface AuthenticatorProps {
  credentialID: string
  userId: string
  providerAccountId: string
  credentialPublicKey: string
  counter: number 
  credentialDeviceType: string 
  credentialBackedUp: boolean 
  transports?: string
  user: UserProps
}

// -------------------------

export interface DestinationProps {
  id: string 
  name: string 
  slug: string 
  description: string 
  cover?: string
  address: string 
  latitude: string 
  longitude: string 
  price: number
  districtSlug: string
  categorySlug: string
  createdAt: string
  updatedAt: string

  district: DistrictProps
  category: CategoryProps
  favoritedByUsers: UsersFavoriteDestinationsProps[]
  commentedByUsers: UsersCommentDestinationsProps[]
  ratedByUsers: UsersRateDestinationsProps[]
  images: ImageProps[]
}

export interface CultureProps {
  id: string
  name: string
  slug: string
  address?: string
  cover?: string
  description: string
  body?: string
  districtSlug?: string
  categorySlug?: string
  createdAt: string
  updatedAt: string

  district?: DistrictProps 
  category?: CategoryProps
  favoritedByUsers: UsersFavoriteCulturesProps[]
  commentedByUsers: UsersCommentCulturesProps[]
  images: ImageProps[]
}

export interface StoryProps {
  id: string
  slug: string
  name: string
  description: string
  body: string
  readtime?: number
  cover: string
  createdAt: string
  updatedAt: string

  userEmail: string
  user: UserProps
  favoritedByUsers: UsersFavoriteStoriesProps[]
  commentedByUsers: UsersCommentStoriesProps[]
  images: ImageProps[]
}

export interface DistrictProps {
  id: string
  name: string
  slug: string
  cover?: string
  description: string
  destinations: DestinationProps[]
  createdAt: string
  updatedAt: string
  cultures: CultureProps[]
}

export interface CategoryProps {
  id: string
  name: string
  slug: string
  cover?: string
  destinations: DestinationProps[]
  description: string
  updatedAt: string
  createdAt: string
  cultures: CultureProps[]
}

export interface ImageProps {
  id: string
  uri: string
  destinationSlug: string
  storySlug?: string
  description: string
  cultureSlug?: string

  destination?: DestinationProps
  story?: StoryProps
  culture?: CultureProps
  createdAt: string
  updatedAt: string

}

export interface UsersFavoriteDestinationsProps {
  userEmail: string
  user: UserProps
  destinationSlug: string 
  destination: DestinationProps
  createdAt: string
  updatedAt: string
}

export interface UsersFavoriteStoriesProps {
  userEmail: string
  user: UserProps
  storyId: string
  story: StoryProps
  createdAt: string
  updatedAt: string

}

export interface UsersFavoriteCulturesProps {
  userEmail: string
  user: UserProps
  cultureSlug: string 
  culture: CultureProps
  createdAt: string
  updatedAt: string
}

export interface UsersCommentStoriesProps {
  id: string         
  userEmail: string
  body: string      
  storySlug: string 
  parentId?: string   
  parent?: UsersCommentStoriesProps
  childs: UsersCommentStoriesProps[]
  user: UserProps
  story: StoryProps
  createdAt: string
  updatedAt: string
}

export interface UsersCommentDestinationsProps {
  id: string
  userEmail: string
  destinationSlug: string
  parentId?: string
  body: string
  user: UserProps
  parent?: UsersCommentDestinationsProps
  childs: UsersCommentDestinationsProps[]
  destination: DestinationProps
  createdAt: string
  updatedAt: string
}

export interface UsersCommentCulturesProps {
  id: string
  userEmail: string
  cultureSlug: string
  parentId?: string
  body: string
  parent?: UsersCommentCulturesProps
  childs: UsersCommentCulturesProps[]
  user: UserProps
  culture: CultureProps
  createdAt: string
  updatedAt: string
}

export interface UsersRateDestinationsProps {
  userEmail: string
  destinationSlug: string
  rate: number
  user: UserProps
  destination: DestinationProps
  createdAt: string
  updatedAt: string
}
