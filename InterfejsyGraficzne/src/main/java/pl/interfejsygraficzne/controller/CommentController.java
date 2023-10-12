package pl.interfejsygraficzne.controller;


import org.springframework.web.bind.annotation.*;
import pl.interfejsygraficzne.Model.Comment;
import pl.interfejsygraficzne.Service.CommentService;
import pl.interfejsygraficzne.Service.MovieService;

import java.util.List;

@RestController
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PutMapping("/movie/{id}/addcomment")
    public Comment addComment(@RequestBody Comment comment, @PathVariable Long id) {
        return commentService.saveComment(comment, id);
    }

    @GetMapping("/getallcomments")
    public List<Comment> getAllComments() {
        return commentService.getComments();
    }

    @GetMapping("/getcommentbyid/{id}")
    public Comment getCommentById(@PathVariable Long id) {
        return commentService.getCommentById(id);
    }

    @GetMapping("/getcommentcontaining/{text}")
    public List<Comment> getCommentContaining(@PathVariable String text) {
        return commentService.getCommentContaining(text);
    }


    @DeleteMapping("/deletecomment/{id}")
    public String deleteUser(@PathVariable Long id){
        return commentService.deleteComment(id);
    }
}
