// src/utils/errorHandler.ts
import { GraphQLError } from "graphql";

/**
 * Parses GraphQL errors and extracts meaningful messages.
 * @param error The error object thrown during a GraphQL request.
 * @returns A formatted error message string.
 */
export function formatGraphQLError(error: any): string {
  if (error instanceof GraphQLError) {
    return error.message;
  }

  if (error.response && error.response.errors && error.response.errors.length) {
    return error.response.errors
      .map((err: GraphQLError) => err.message)
      .join(", ");
  }

  // Handles non-GraphQL errors or client-specific errors
  if (error.message) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again later.";
}
