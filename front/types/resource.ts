export interface Category {
  categoryType: 'Image' | 'Video' | 'Audio' | 'Document' | 'Other';
}

export interface Comment {
  _id: string;
  creationDate?: Date;
  content: string;
  commenter: string;
}

export interface Resource {
  _id: string;
  title: string;
  type: string;
  categories: Category[];
  uploader: string;
  comments: Comment[];
  isArchived?: boolean;
  isFavorite?: boolean;
}
