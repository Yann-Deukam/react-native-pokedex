import Card from "@/components/card";
import PokemonCard from "@/components/pokemon/PokemonCard";
import RootView from "@/components/RootView";
import Row from "@/components/Row";
import SearchBar from "@/components/SearchBar";
import SortButton from "@/components/SortButton";
import ThemeText from "@/components/themeText";
import { getPokemonId } from "@/functions/pokemon";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";

export default function Index() {
  const colors = useThemeColors();
  const { data, isFetching, fetchNextPage } =
    useInfiniteFetchQuery<"/pokemon?limit=21">("pokemon?limit=21");
  const pokemons =
    data?.pages.flatMap((page) =>
      page.results.map((r) => ({ name: r.name, id: getPokemonId(r.url) }))
    ) ?? [];
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<"id" | "name">("id");
  const filteredPokemons = [
    ...(search
      ? pokemons.filter(
          (pokemon) =>
            pokemon.name.includes(search.toLowerCase()) ||
            pokemon.id.toString() === search
        )
      : pokemons),
  ].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));

  return (
    <RootView>
      <Row style={styles.header} gap={12}>
        <Image
          source={require("@/assets/images/pokeball.png")}
          style={{ width: 24, height: 24 }}
          resizeMode="contain"
        />
        <ThemeText variant="headline" color="grayWhite">
          Pokedex
        </ThemeText>
      </Row>
      <Row gap={12}>
        <SearchBar value={search} onChange={setSearch} />
        <SortButton value={sortKey} onChange={setSortKey} />
      </Row>
      <Card style={styles.body}>
        <FlatList
          data={filteredPokemons}
          numColumns={3}
          columnWrapperStyle={styles.gridGap}
          contentContainerStyle={[styles.gridGap, styles.list]}
          ListFooterComponent={
            isFetching ? <ActivityIndicator color={colors.tint} /> : null
          }
          renderItem={({ item }) => (
            <PokemonCard
              id={item.id}
              name={item.name}
              style={{ flex: 1 / 3 }}
            />
          )}
          onEndReached={search ? undefined : () => fetchNextPage()}
          keyExtractor={(item) => item.id.toString()}
        ></FlatList>
      </Card>
    </RootView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 8,
    paddingVertical: 24,
  },
  body: {
    flex: 1,
    marginTop: 12,
  },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12,
  },
});
