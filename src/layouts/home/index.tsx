import { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Pokemon, SimplePokemon } from "../../types";
import { Loader } from "../../components/Loader";
import { PokemonService } from "../../services/pokemon";
import { Card } from "../../Card";

export const Home = () => {
    const [pokemons, setPokemons] = useState<SimplePokemon[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [nextPage, setNextPage] = useState('')
    const [previousPage, setPreviousPage] = useState<string | undefined>("")
    const [pokemon, setPokemon] = useState<Pokemon>()

    const getPokemons = useCallback(async (page: string) => {
        setIsLoading(true);

        try {
           const {results, next, previous } = await PokemonService.getPokemons(
            page
        ) 
        setPokemons(results)

        } catch (error) {
            console.error("Erro na busca de pokémons:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const onHandleSearch = async (value: string) => {}

    useEffect(() => {
        getPokemons("")
    }, [getPokemons])

    return (
        <div className="h-full m-full bg-blue-100">

            <Header title="Pokédex">
                <Input onHandleSearch={() => {}} />
            </Header>

            

            {isLoading ? (
                <div className="flex justify-center h-screen"> 
                                <Loader/>
                </div>
            ) : (
                <main className="mt-5 md:mt-10 flex justify-center flex-wrap">
                    {pokemons.map(pokemon => (
                        <Card key={pokemon.name} simplePokemon={pokemon}/>
                    ))}
                </main>
            )}
        </div>
    )
}


