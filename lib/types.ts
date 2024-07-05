export interface routesProps {
  name: string,
  route: string
}

export interface userProps {
  id: string;
  name: string;
  email: string;
  emailVerified: string;
  image: string;
  // favoritedDestinations: destinationProps[]

  // ratedDestinations     UsersRateDestinations[]
  // favoritedStories      UsersFavoriteStories[]
  // favoritedCultures     UsersFavoriteCultures[]
  // commentedDestinations UsersCommentDestinations[]
  // commentedStories      UsersCommentStories[]
  // commentedCultures     UsersCommentCultures[]
  // stories               Story[]
  createdAt: string;
  updatedAt: string;
}

// export interface destinationProps {
//   id: string; 
//   name: string; 
//   slug: string; 
//   description: string; 
//   cover?: string;
//   address: string;
//   latitude: string; 
//   longitude: string; 
//   price: number
//   districtSlug: string;
//   categorySlug: string;
//   createdAt: string;
//   updatedAt: string;

//   favoritedByUsers UsersFavoriteDestinations[]
//   commentedByUsers UsersCommentDestinations[]
//   ratedByUsers     UsersRateDestinations[]
//   images           Image[]
// }

// export interface cultureProps {
//   id: string;
//   name: string;
//   slug: string;
//   address?: string;
//   cover?: string;
//   description: string;
//   body?: string;
//   districtSlug?: string;
//   categorySlug?: string;
//   createdAt: string;
//   updatedAt: string;

//   favoritedByUsers UsersFavoriteCultures[]
//   commentedByUsers UsersCommentCultures[]
//   images           Image[]
// }

// export interface storyProps {
//   id: string;
//   slug: string;
//   createdAt: string;
//   updatedAt: string;

//   userEmail: string;
//   favoritedByUsers UsersFavoriteStories[]
//   commentedByUsers UsersCommentStories[]
//   images           Image[]
// }

// export interface districtProps {
//   id: string;
//   name: string;
//   slug: string;
//   cover?: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;

//   destinations Destination[]
//   cultures     Culture[]
// }

// export interface categoryProps {
//   id: string;
//   name: string;
//   slug: string;
//   cover: string;
//   description: string;

//   updatedAt: string;
//   createdAt: string;
//   cultures  Culture[]
//   destinations Destination[]
// }

// export interface imageProps {
//   id: string;
//   uri: string;
//   destinationSlug?: string;
//   storySlug?: string;
//   cultureSlug?: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// }
