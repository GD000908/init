package com.jobmanagement.service;

import com.jobmanagement.dto.PostDto;
import com.jobmanagement.entity.Post;
import com.jobmanagement.entity.User;
import com.jobmanagement.repository.PostRepository;
import com.jobmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public List<PostDto> getPostsByUser(Long userId) {
        List<Post> posts = postRepository.findByUserUserId(userId);
        return posts.stream().map(PostDto::from).collect(Collectors.toList());
    }

    public PostDto getPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        return PostDto.from(post);
    }

    @Transactional
    public PostDto createPost(PostDto postDto) {
        User user = userRepository.findById(postDto.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        Post post = Post.builder()
                .user(user)
                .content(postDto.getContent())
                .build();
        Post saved = postRepository.save(post);
        return PostDto.from(saved);
    }

    @Transactional
    public PostDto updatePost(Long postId, PostDto postDto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
        if (postDto.getContent() != null) {
            post.setContent(postDto.getContent());
        }
        Post saved = postRepository.save(post);
        return PostDto.from(saved);
    }

    @Transactional
    public void deletePost(Long postId) {
        if (!postRepository.existsById(postId)) {
            throw new RuntimeException("게시글을 찾을 수 없습니다.");
        }
        postRepository.deleteById(postId);
    }
}
