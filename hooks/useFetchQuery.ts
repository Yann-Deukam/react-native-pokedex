import { Colors } from "@/constants/Colors";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const endpoint = "https://pokeapi.co/api/v2/";

type API = {
  "/pokemon?limit=21": {
    count: number;
    results: { name: string; url: string }[];
    next: string | null;
  };
  "/pokemon/{id}": {
    id: number;
    name: string;
    url: string;
    weight: number;
    height: number;
    moves: { move: { name: string; url: string } }[];
    types: {
      type: {
        name: keyof (typeof Colors)["type"];
      };
    }[];
    cries: { latest: string };
    abilities: { ability: { name: string; url: string } }[];
    forms: { form: { name: string; url: string } }[];
  };
};

export function useFetchQuery<T extends keyof API>(
  path: string,
  params?: Record<string, string | number>
) {
  const localUrl =
    endpoint +
    Object.entries(params ?? {}).reduce(
      (acc, [key, value]) => acc.replaceAll(`[${key}]`, String(value)),
      path
    );

  return useQuery({
    queryKey: [localUrl],
    queryFn: async () => {
      await wait(1); // Simulate network delay
      return fetch(localUrl).then((res) => res.json() as Promise<API[T]>);
    },
  });
}

export function useInfiniteFetchQuery<T extends keyof API>(path: string) {
  const endpoint = "https://pokeapi.co/api/v2/";

  return useInfiniteQuery({
    queryKey: [path],
    initialPageParam: endpoint + path,
    queryFn: async ({ pageParam }) => {
      await wait(1);
      return fetch(pageParam, {
        headers: {
          Accept: "application/json",
        },
      }).then((res) => res.json()) as Promise<API[T]>;
    },
    getNextPageParam: (lastPage) => {
      if ("next" in lastPage) {
        return lastPage.next;
      }
      return null;
    },
  });
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration * 1000));
}
