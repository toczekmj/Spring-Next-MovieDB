package pl.interfejsygraficzne.controller;


import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import pl.interfejsygraficzne.Model.Comment;
import pl.interfejsygraficzne.Service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @Operation(summary = "get all comments that belongs to the movie")
    @PutMapping("/movies/{id}/comments")
    public Comment addComment(@Valid @RequestBody Comment comment, @PathVariable Long id) {
        return commentService.saveComment(comment, id);
    }

    @Operation(summary = "find comments containing phrase")
    @GetMapping("/comments")
    public List<Comment> getAllComments(@RequestParam("text") String text) {
        if (text == null) {
            return commentService.getComments();
        } else {
            return commentService.getCommentContaining(text);
        }
    }

    @Operation(summary = "get comment by id")
    @GetMapping("/comments/{id}")
    public Comment getCommentById(@PathVariable Long id) {
        return commentService.getCommentById(id);
    }

    @Operation(summary = "delete comment by id")
    @DeleteMapping("/comments/{id}")
    public String deleteComment(@PathVariable Long id){
        return commentService.deleteComment(id);
    }
}
