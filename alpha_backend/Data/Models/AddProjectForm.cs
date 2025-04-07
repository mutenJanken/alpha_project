﻿using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class AddProjectForm
    {
        public string? Image { get; set; }

        [Required]
        public string ProjectName { get; set; } = null!;
        public string? Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal? Budget { get; set; }

        [Required]
        public string ClientId { get; set; } = null!;

        public int StatusId { get; set; } 

        [Required]
        public string UserId { get; set; } = null!;
    }
}
