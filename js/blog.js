// Blog Post Filtering
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.category-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  if (filterButtons.length && blogCards.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const category = this.dataset.category;

        blogCards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            // Trigger fade-in animation
            card.classList.remove('fade-in');
            void card.offsetWidth; // Trigger reflow
            card.classList.add('fade-in');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});

// Blog Post Search
const searchInput = document.querySelector('.blog-search');
if (searchInput) {
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const blogCards = document.querySelectorAll('.blog-card');

    blogCards.forEach(card => {
      const title = card.querySelector('.blog-card-title').textContent.toLowerCase();
      const excerpt = card.querySelector('.blog-card-excerpt').textContent.toLowerCase();
      const tags = Array.from(card.querySelectorAll('.blog-card-tag')).map(tag => tag.textContent.toLowerCase());

      if (title.includes(searchTerm) || 
          excerpt.includes(searchTerm) || 
          tags.some(tag => tag.includes(searchTerm))) {
        card.style.display = 'block';
        // Trigger fade-in animation
        card.classList.remove('fade-in');
        void card.offsetWidth; // Trigger reflow
        card.classList.add('fade-in');
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Blog Post Reading Time
function calculateReadingTime() {
  const blogPosts = document.querySelectorAll('.blog-post-content');
  
  blogPosts.forEach(post => {
    const text = post.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
    
    const readingTimeElement = document.createElement('div');
    readingTimeElement.className = 'reading-time';
    readingTimeElement.textContent = `${readingTime} min read`;
    
    const meta = post.closest('.blog-post').querySelector('.blog-post-meta');
    if (meta) {
      meta.appendChild(readingTimeElement);
    }
  });
}

// Add reading time styles
const readingTimeStyle = document.createElement('style');
readingTimeStyle.textContent = `
  .reading-time {
    color: var(--text-light);
    font-size: 0.875rem;
  }
  
  .blog-post-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;
document.head.appendChild(readingTimeStyle);

// Calculate reading time when the page loads
document.addEventListener('DOMContentLoaded', calculateReadingTime);

// Blog Post Table of Contents
function generateTableOfContents() {
  const blogPost = document.querySelector('.blog-post-content');
  if (!blogPost) return;

  const headings = blogPost.querySelectorAll('h2, h3');
  if (headings.length === 0) return;

  const toc = document.createElement('div');
  toc.className = 'table-of-contents';
  
  const tocTitle = document.createElement('h2');
  tocTitle.textContent = 'Table of Contents';
  toc.appendChild(tocTitle);

  const tocList = document.createElement('ul');
  tocList.className = 'toc-list';

  headings.forEach((heading, index) => {
    const id = `heading-${index}`;
    heading.id = id;

    const listItem = document.createElement('li');
    listItem.className = `toc-item toc-${heading.tagName.toLowerCase()}`;
    
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = heading.textContent;
    
    listItem.appendChild(link);
    tocList.appendChild(listItem);
  });

  toc.appendChild(tocList);
  blogPost.insertBefore(toc, blogPost.firstChild);
}

// Add table of contents styles
const tocStyle = document.createElement('style');
tocStyle.textContent = `
  .table-of-contents {
    background-color: var(--background-alt);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .toc-list {
    list-style: none;
    padding: 0;
    margin: 1rem 0 0 0;
  }
  
  .toc-item {
    margin-bottom: 0.5rem;
  }
  
  .toc-h3 {
    margin-left: 1rem;
  }
  
  .toc-item a {
    color: var(--text-color);
    text-decoration: none;
  }
  
  .toc-item a:hover {
    color: var(--primary-color);
  }
`;
document.head.appendChild(tocStyle);

// Generate table of contents when the page loads
document.addEventListener('DOMContentLoaded', generateTableOfContents);

// Blog Post Code Syntax Highlighting
function highlightCodeBlocks() {
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach(block => {
    // Here you would typically use a syntax highlighting library
    // For example: Prism.js or Highlight.js
    // For now, we'll just add a class for styling
    block.classList.add('highlighted-code');
  });
}

// Add code highlighting styles
const codeHighlightStyle = document.createElement('style');
codeHighlightStyle.textContent = `
  .highlighted-code {
    font-family: 'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;
document.head.appendChild(codeHighlightStyle);

// Apply syntax highlighting when the page loads
document.addEventListener('DOMContentLoaded', highlightCodeBlocks); 