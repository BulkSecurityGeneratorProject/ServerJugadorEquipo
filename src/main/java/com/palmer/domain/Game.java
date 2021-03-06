package com.palmer.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Game.
 */
@Entity
@Table(name = "game")
public class Game implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "local_score")
    private Integer localScore;

    @Column(name = "visitor_score")
    private Integer visitorScore;

    @Column(name = "start_time")
    private LocalDate startTime;

    @Column(name = "finish_time")
    private LocalDate finishTime;

    @ManyToOne
    private Team gameLocalTeam;

    @ManyToOne
    private Team gameVisitorTeam;

    @OneToMany(mappedBy = "game")
    @JsonIgnore
    private Set<GameRating> gameRatings = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Game name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLocalScore() {
        return localScore;
    }

    public Game localScore(Integer localScore) {
        this.localScore = localScore;
        return this;
    }

    public void setLocalScore(Integer localScore) {
        this.localScore = localScore;
    }

    public Integer getVisitorScore() {
        return visitorScore;
    }

    public Game visitorScore(Integer visitorScore) {
        this.visitorScore = visitorScore;
        return this;
    }

    public void setVisitorScore(Integer visitorScore) {
        this.visitorScore = visitorScore;
    }

    public LocalDate getStartTime() {
        return startTime;
    }

    public Game startTime(LocalDate startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(LocalDate startTime) {
        this.startTime = startTime;
    }

    public LocalDate getFinishTime() {
        return finishTime;
    }

    public Game finishTime(LocalDate finishTime) {
        this.finishTime = finishTime;
        return this;
    }

    public void setFinishTime(LocalDate finishTime) {
        this.finishTime = finishTime;
    }

    public Team getGameLocalTeam() {
        return gameLocalTeam;
    }

    public Game gameLocalTeam(Team team) {
        this.gameLocalTeam = team;
        return this;
    }

    public void setGameLocalTeam(Team team) {
        this.gameLocalTeam = team;
    }

    public Team getGameVisitorTeam() {
        return gameVisitorTeam;
    }

    public Game gameVisitorTeam(Team team) {
        this.gameVisitorTeam = team;
        return this;
    }

    public void setGameVisitorTeam(Team team) {
        this.gameVisitorTeam = team;
    }

    public Set<GameRating> getGameRatings() {
        return gameRatings;
    }

    public Game gameRatings(Set<GameRating> gameRatings) {
        this.gameRatings = gameRatings;
        return this;
    }

    public Game addGameRating(GameRating gameRating) {
        this.gameRatings.add(gameRating);
        gameRating.setGame(this);
        return this;
    }

    public Game removeGameRating(GameRating gameRating) {
        this.gameRatings.remove(gameRating);
        gameRating.setGame(null);
        return this;
    }

    public void setGameRatings(Set<GameRating> gameRatings) {
        this.gameRatings = gameRatings;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Game game = (Game) o;
        if (game.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, game.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Game{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", localScore='" + localScore + "'" +
            ", visitorScore='" + visitorScore + "'" +
            ", startTime='" + startTime + "'" +
            ", finishTime='" + finishTime + "'" +
            '}';
    }
}
