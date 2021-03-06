package com.palmer.repository;


import com.palmer.domain.FavouritePlayer;
import com.palmer.domain.Player;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Spring Data JPA repository for the FavouritePlayer entity.
 */
@SuppressWarnings("unused")
public interface FavouritePlayerRepository extends JpaRepository<FavouritePlayer,Long> {

    @Query("select favouritePlayer from FavouritePlayer favouritePlayer where favouritePlayer.user.login = ?#{principal.username}")
    List<FavouritePlayer> findByUserIsCurrentUser();

    @Query("select favouritePlayer.player, count(favouritePlayer) from FavouritePlayer favouritePlayer " +
        "group by favouritePlayer.player order by count(favouritePlayer) desc ")
    List<Object[]> findTopPlayers();

    @Query("select favouritePlayer.player, count(favouritePlayer) from FavouritePlayer favouritePlayer " +
        "group by favouritePlayer.player order by count(favouritePlayer) desc ")
    List<Object[]> findTopFivePlayers(Pageable pageable);

    @Query("select favouritePlayer.favouriteDateTime " +
        "from FavouritePlayer favouritePlayer " +
        "where favouritePlayer.player = :favourite")
    List<LocalDateTime> getEvolution(@Param("favourite") Player favourite);

    @Query("select favouritePlayer from FavouritePlayer favouritePlayer " +
        "where favouritePlayer.user.id = :userID " +
        "and favouritePlayer.player.id = :playerID")
    FavouritePlayer getFavouritePlayer(@Param("userID") Long userID, @Param("playerID") Long playerID);

}
