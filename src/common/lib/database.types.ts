export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      call_sheet_views: {
        Row: {
          call_sheet_id: number
          email: string
        }
        Insert: {
          call_sheet_id: number
          email: string
        }
        Update: {
          call_sheet_id?: number
          email?: string
        }
      }
      call_sheets: {
        Row: {
          date: string
          end_time: string
          id: number
          image: string | null
          lunch_time: string | null
          note: string | null
          project_id: number
          start_time: string
          title: string
        }
        Insert: {
          date: string
          end_time: string
          id?: number
          image?: string | null
          lunch_time?: string | null
          note?: string | null
          project_id: number
          start_time: string
          title: string
        }
        Update: {
          date?: string
          end_time?: string
          id?: number
          image?: string | null
          lunch_time?: string | null
          note?: string | null
          project_id?: number
          start_time?: string
          title?: string
        }
      }
      cast_call_times: {
        Row: {
          call_sheet_id: number
          call_time: string | null
          cast_role_id: number
          hmc_call_time: string | null
          id: number
          pat_call_time: string | null
        }
        Insert: {
          call_sheet_id: number
          call_time?: string | null
          cast_role_id: number
          hmc_call_time?: string | null
          id?: number
          pat_call_time?: string | null
        }
        Update: {
          call_sheet_id?: number
          call_time?: string | null
          cast_role_id?: number
          hmc_call_time?: string | null
          id?: number
          pat_call_time?: string | null
        }
      }
      cast_roles: {
        Row: {
          email: string
          fiction_name: string | null
          id: number
          number: number
          project_id: number
          user_name: string | null
        }
        Insert: {
          email: string
          fiction_name?: string | null
          id?: number
          number: number
          project_id: number
          user_name?: string | null
        }
        Update: {
          email?: string
          fiction_name?: string | null
          id?: number
          number?: number
          project_id?: number
          user_name?: string | null
        }
      }
      department_call_times: {
        Row: {
          call_sheet_id: number | null
          department_id: number | null
          id: number
          time: string | null
        }
        Insert: {
          call_sheet_id?: number | null
          department_id?: number | null
          id?: number
          time?: string | null
        }
        Update: {
          call_sheet_id?: number | null
          department_id?: number | null
          id?: number
          time?: string | null
        }
      }
      departments: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
      }
      filmaking_roles: {
        Row: {
          department_id: number | null
          id: number
          name: string | null
        }
        Insert: {
          department_id?: number | null
          id?: number
          name?: string | null
        }
        Update: {
          department_id?: number | null
          id?: number
          name?: string | null
        }
      }
      locations: {
        Row: {
          address: string | null
          call_sheet_id: number | null
          hospital_address: string | null
          id: number
          parking_address: string | null
          scenery_name: string | null
        }
        Insert: {
          address?: string | null
          call_sheet_id?: number | null
          hospital_address?: string | null
          id?: number
          parking_address?: string | null
          scenery_name?: string | null
        }
        Update: {
          address?: string | null
          call_sheet_id?: number | null
          hospital_address?: string | null
          id?: number
          parking_address?: string | null
          scenery_name?: string | null
        }
      }
      permissions_options: {
        Row: {
          description: string | null
          id: number
          name: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          name?: string | null
        }
      }
      project_categories: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
      }
      project_users: {
        Row: {
          email: string
          permission_option_id: number | null
          project_id: number
          status: string | null
          user_id: string | null
        }
        Insert: {
          email: string
          permission_option_id?: number | null
          project_id: number
          status?: string | null
          user_id?: string | null
        }
        Update: {
          email?: string
          permission_option_id?: number | null
          project_id?: number
          status?: string | null
          user_id?: string | null
        }
      }
      projects: {
        Row: {
          category_id: number | null
          created_at: string | null
          end_date: string | null
          id: number
          manager_id: string | null
          start_date: string | null
          status: string | null
          title: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          end_date?: string | null
          id?: number
          manager_id?: string | null
          start_date?: string | null
          status?: string | null
          title?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          end_date?: string | null
          id?: number
          manager_id?: string | null
          start_date?: string | null
          status?: string | null
          title?: string | null
        }
      }
      sequence_role_unions: {
        Row: {
          cast_role_id: number
          sequence_id: number
        }
        Insert: {
          cast_role_id: number
          sequence_id: number
        }
        Update: {
          cast_role_id?: number
          sequence_id?: number
        }
      }
      sequences: {
        Row: {
          call_sheet_date: string | null
          call_sheet_id: number | null
          call_time: string | null
          description: string | null
          effect: string | null
          id: number
          name: string | null
          scenery_name: string | null
        }
        Insert: {
          call_sheet_date?: string | null
          call_sheet_id?: number | null
          call_time?: string | null
          description?: string | null
          effect?: string | null
          id?: number
          name?: string | null
          scenery_name?: string | null
        }
        Update: {
          call_sheet_date?: string | null
          call_sheet_id?: number | null
          call_time?: string | null
          description?: string | null
          effect?: string | null
          id?: number
          name?: string | null
          scenery_name?: string | null
        }
      }
      user_accounts: {
        Row: {
          id: number
          role_id: number | null
          user_id: string | null
        }
        Insert: {
          id?: number
          role_id?: number | null
          user_id?: string | null
        }
        Update: {
          id?: number
          role_id?: number | null
          user_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
